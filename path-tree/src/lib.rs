use path_tree::*;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Router {
	tree: PathTree<u32>,
}

#[derive(Serialize, Deserialize)]
pub struct FindResult {
	pub key: u32,
	params: Vec<(String, String)>,
}

#[wasm_bindgen]
impl Router {
	pub fn create_router() -> Router {
		Router {
			tree: PathTree::<u32>::new(),
		}
	}

	pub fn insert(&mut self, path: String, data: u32) {
		self.tree.insert(String::from(path).as_mut_str(), data);
	}

	pub fn find(&self, path: String) -> JsValue {
		let result = self.tree.find(path.as_str());

		match result {
			Some(value) => {
				let result = FindResult {
					key: *value.0,
					params: value
						.1
						.into_iter()
						.map(|param| (String::from(param.0), String::from(param.1)))
						.collect(),
				};

				JsValue::from_serde(&result).unwrap()
			}
			None => {
				let result = FindResult {
					key: 0,
					params: vec![],
				};

				JsValue::from_serde(&result).unwrap()
			}
		}
	}
}
