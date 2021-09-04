import { ApiCore } from "./core";

const date_api = new ApiCore({
	get: true,
	url: "trades/get_by_date/",
});

const trade_api = new ApiCore({
	get: true,
	url: "trades/get_by_trade/",
});

const client_api = new ApiCore({
	get: true,
	url: "trades/get_by_client/",
});

const client_file_api = new ApiCore({
	postFile: true,
	url: "trades/set_clients/",
});

const trade_file_api = new ApiCore({
	postFile: true,
	url: "trades/set_trades/",
});

export { date_api, trade_api, client_api, client_file_api, trade_file_api };
