pub mod handler {
	use gotham::hyper::Version;
	use gotham::prelude::*;
	use gotham::state::State;

	pub fn http_version_handler(state: &State) -> &Version {
		Version::borrow_from(state)
	}
}

pub mod utilities {
	use gotham::hyper::Version;

	pub fn use_http_version(version: &Version) -> String {
		format!("{:?}", version).to_lowercase()
	}
}
