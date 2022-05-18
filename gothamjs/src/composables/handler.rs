pub mod utilities {
	use crate::composables::headers;
	use crate::composables::http_version;
	use crate::composables::method;
	use crate::composables::uri;
	use futures_util::future::{self, FutureExt};
	use gotham::handler::HandlerFuture;
	use gotham::helpers::http::response::{create_empty_response, create_response};
	use gotham::hyper::{header, Body, StatusCode};
	use gotham::prelude::*;
	use gotham::state::State;
	use napi::bindgen_prelude::*;
	use napi::Result;
	use std::collections::HashMap;
	use std::future::Future;
	use std::pin::Pin;

	#[napi(object)]
	pub struct ParsedUri {
		pub query: String,
		pub scheme: String,
		pub authority: String,
		pub path: String,
	}

	#[napi(object)]
	pub struct JsRequest {
		pub uri: ParsedUri,
		pub method: String,
		pub http_version: String,
		pub headers: HashMap<String, Vec<String>>,
		pub body: Buffer,
	}

	#[napi(object)]
	pub struct JsResponse {
		pub uri: ParsedUri,
		pub headers: HashMap<String, Vec<String>>,
		pub body: Buffer,
		pub status_code: u32,
		pub status_message: String,
	}

	pub async fn create_gotham_handler<F, X>(
		f: &'static F,
	) -> impl Fn(State) -> Pin<Box<HandlerFuture>>
	where
		F: Fn(JsRequest) -> Pin<Box<dyn Future<Output = Result<JsResponse>> + Send + Sync>>
			+ Send
			+ Sync,
	{
		move |mut state| {
			let future =
				gotham::hyper::body::to_bytes(Body::take_from(&mut state)).then(
					|full_body| match full_body {
						Ok(valid_body) => {
							let uri = uri::handler::uri_handler(&state);
							let headers = headers::handler::headers_handler(&state);
							let method = method::handler::method_handler(&state);
							let http_version = http_version::handler::http_version_handler(&state);
							let body = Buffer::from(valid_body.to_vec());

							let parsed_uri = ParsedUri {
								query: uri::utilities::use_query(uri),
								scheme: uri::utilities::use_scheme(uri),
								authority: uri::utilities::use_authority(uri),
								path: uri::utilities::use_path(uri),
							};

							let req = JsRequest {
								uri: parsed_uri,
								method: method::utilities::use_method(method),
								http_version: http_version::utilities::use_http_version(http_version),
								headers: headers::utilities::use_headers(headers),
								body,
							};

							f(req).then(|ret| {
								let res = match ret {
									Ok(ret) => {
										let status_code = StatusCode::from_u16(ret.status_code as u16).unwrap();

										let mime = match ret.headers.get("content-type") {
											Some(value) => value[0].as_str(),
											None => "application/json",
										};

										let mut res = create_response(
											&state,
											status_code,
											mime.parse().unwrap(),
											ret.body.to_vec(),
										);

										let headers = res.headers_mut();
										for (key, value) in ret.headers {
											headers.insert(
												header::HeaderName::from_bytes(key.as_bytes()).unwrap(),
												value.join(";").parse().unwrap(),
											);
										}

										res
									}
									Err(_) => create_empty_response(&state, StatusCode::INTERNAL_SERVER_ERROR),
								};

								future::ok((state, res))
							})
						}
						Err(e) => panic!("{}", e),
					},
				);

			future.boxed()
		}
	}
}
