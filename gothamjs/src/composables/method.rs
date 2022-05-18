pub mod handler {
	use gotham::hyper::Method;
	use gotham::prelude::*;
	use gotham::state::State;

	pub fn method_handler(state: &State) -> &Method {
		Method::borrow_from(state)
	}
}

pub mod utilities {
	use gotham::hyper::Method;

	pub fn use_method(method: &Method) -> String {
		String::from(method.as_str()).to_lowercase()
	}
}
