import axios from "axios";
import {
	handleResponse,
	handleError
} from "./response";

const BASE_URL = "http://127.0.0.1:8001";

/** @param {string} resource */
const get = (resource, model) => {
	return axios
		.get(`${BASE_URL}/${resource}`, {params: model})
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const getSingle = (resource, id) => {
	return axios
		.get(`${BASE_URL}/${resource}/${id}`)
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) => {
	return axios
		.post(`${BASE_URL}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const postFile = (resource, model) => {

	let fileData = new FormData();
	fileData.append("file", model);

	return axios({
		method: "post",
		url: `${BASE_URL}/${resource}`,
		data: fileData,
	})
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model) => {
	return axios
		.put(`${BASE_URL}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model) => {
	return axios
		.patch(`${BASE_URL}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => {
	return (
		axios
			.delete(`${BASE_URL}/${resource}`, id)
			.then(handleResponse)
			.catch(handleError)
	);
};

export const apiProvider = {
	get,
	getSingle,
	post,
	put,
	patch,
	remove,
	postFile,
};
