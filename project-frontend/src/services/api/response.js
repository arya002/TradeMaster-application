const BASE_URL = "http://127.0.0.1:8001";

function handleResponse(response) {

	return response;
}

function handleError(error) {
	if (error.data) {
		return error.data;
	}
	return error;
}

export { handleResponse, handleError };
