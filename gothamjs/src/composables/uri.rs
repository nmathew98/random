pub mod handler {
	use gotham::hyper::Uri;
	use gotham::prelude::*;
	use gotham::state::State;

	pub fn uri_handler(state: &State) -> &Uri {
		Uri::borrow_from(state)
	}
}

pub mod utilities {
	use gotham::hyper::Uri;

	pub fn use_scheme(uri: &Uri) -> String {
		match uri.scheme() {
			Some(value) => String::from(value.as_str()),
			None => String::from(""),
		}
	}

	pub fn use_authority(uri: &Uri) -> String {
		match uri.authority() {
			Some(value) => String::from(value.as_str()),
			None => String::from(""),
		}
	}

	pub fn use_path(uri: &Uri) -> String {
		String::from(uri.path())
	}

	pub fn use_query(uri: &Uri) -> String {
		match uri.query() {
			Some(value) => String::from(value),
			None => String::from(""),
		}
	}

	pub fn parse_uri(uri: String) -> Uri {
		match uri.parse::<Uri>() {
			Ok(value) => value,
			Err(e) => panic!("Error while parsing URL: {}", e),
		}
	}

	#[cfg(test)]
	mod tests {
		use super::*;

		#[test]
		fn use_scheme_valid() {
			let uri: Uri = "https://www.rust-lang.org/install.html"
				.parse::<Uri>()
				.unwrap();

			assert_eq!(super::use_scheme(&uri), "https");
		}

		#[test]
		fn use_scheme_invalid() {
			let uri: Uri = "/install.html".parse::<Uri>().unwrap();

			assert_eq!(super::use_scheme(&uri), "");
		}

		#[test]
		fn use_authority_valid() {
			let uri: Uri = "https://www.rust-lang.org/install.html"
				.parse::<Uri>()
				.unwrap();

			assert_eq!(super::use_authority(&uri), "www.rust-lang.org");
		}

		#[test]
		fn use_authority_invalid() {
			let uri: Uri = "/install.html".parse::<Uri>().unwrap();

			assert_eq!(super::use_authority(&uri), "");
		}

		#[test]
		fn use_path() {
			let uri: Uri = "https://www.rust-lang.org/install.html"
				.parse::<Uri>()
				.unwrap();

			assert_eq!(super::use_path(&uri), "/install.html");
		}

		#[test]
		fn use_query_valid() {
			let uri: Uri = "http://example.org/hello/world?key=value&hello=world"
				.parse::<Uri>()
				.unwrap();

			assert_eq!(super::use_query(&uri), "key=value&hello=world");
		}

		#[test]
		fn use_query_invalid() {
			let uri: Uri = "http://example.org/hello/world".parse::<Uri>().unwrap();

			assert_eq!(super::use_query(&uri), "");
		}
	}
}
