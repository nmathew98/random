pub mod handler {
	use gotham::hyper::HeaderMap;
	use gotham::prelude::*;
	use gotham::state::State;

	pub fn headers_handler(state: &State) -> &HeaderMap {
		HeaderMap::borrow_from(state)
	}
}

pub mod utilities {
	use gotham::hyper::HeaderMap;
	use std::collections::HashMap;

	pub fn use_headers(headers: &HeaderMap) -> HashMap<String, Vec<String>> {
		headers_to_hashmap(headers)
	}

	pub fn use_header(headers: &HeaderMap, key: &'static str) -> Vec<String> {
		let mut values = Vec::new();

		for value in headers.get_all(key).iter() {
			if !value.is_empty() {
				if let Ok(value) = value.to_str() {
					values.push(String::from(value))
				}
			}
		}

		values
	}

	pub fn set_header(headers: &mut HeaderMap, key: &'static str, value: &str) -> bool {
		headers.insert(key, value.parse().unwrap()).is_some()
	}

	pub fn append_header(headers: &mut HeaderMap, key: &'static str, value: &str) -> bool {
		headers.append(key, value.parse().unwrap())
	}

	pub fn remove_header(headers: &mut HeaderMap, key: &'static str) -> bool {
		headers.remove(key).is_some()
	}

	fn headers_to_hashmap(headers: &HeaderMap) -> HashMap<String, Vec<String>> {
		let mut hashmap = HashMap::new();

		for (key, value) in headers {
			let key = key.as_str().to_owned();
			let value = String::from_utf8_lossy(value.as_bytes()).into_owned();
			hashmap.entry(key).or_insert_with(Vec::new).push(value)
		}

		hashmap
	}

	#[cfg(test)]
	mod tests {
		use super::*;

		#[test]
		fn set_header_new_value() {
			let mut headers = HeaderMap::new();

			assert!(!super::set_header(&mut headers, "hello", "world"));
		}

		#[test]
		fn set_header_existing_value() {
			let mut headers = HeaderMap::new();

			headers.insert("hello", "test".parse().unwrap());

			assert!(super::set_header(&mut headers, "hello", "world"));
		}
	}
}
