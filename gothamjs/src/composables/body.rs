pub mod handler {
	use gotham::hyper::{body, Body};
	use gotham::prelude::*;
	use gotham::state::State;

	pub async fn body_handler(mut state: State) -> Vec<u8> {
		let bytes = body::to_bytes(Body::take_from(&mut state)).await;

		match bytes {
			Ok(valid) => valid.to_vec(),
			Err(_) => vec![],
		}
	}
}

pub mod utilities {
	use futures_util::stream::Iter;
	use std::vec::IntoIter;

	pub fn create_stream(chunks: Vec<u8>) -> Iter<IntoIter<u8>> {
		futures_util::stream::iter(chunks)
	}
}
