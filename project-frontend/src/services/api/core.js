import { apiProvider } from "./provider";

export class ApiCore {
	constructor(options) {
		if (options.get) {
			this.get = (model) => {
				return apiProvider.get(options.url, model);
			};
		}

		if (options.getSingle) {
			this.getSingle = (id) => {
				return apiProvider.getSingle(options.url, id);
			};
		}

		if (options.post) {
			this.post = (model) => {
				return apiProvider.post(options.url, model);
			};
		}

		if (options.postFile) {
			this.postFile = (model) => {
				return apiProvider.postFile(options.url, model);
			};
		}

		if (options.put) {
			this.put = (model) => {
				return apiProvider.put(options.url, model);
			};
		}

		if (options.patch) {
			this.patch = (model) => {
				return apiProvider.patch(options.url, model);
			};
		}

		if (options.remove) {
			this.remove = (id) => {
				return apiProvider.remove(options.url, id);
			};
		}
	}
}
