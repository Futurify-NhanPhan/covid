import axios, { AxiosResponse, AxiosInstance } from "axios";
import qs from "qs";
const BASE_URL = 'https://api.covid19api.com'
const axiosInstance = (
): AxiosInstance => {
	const instance = axios.create({
		baseURL: BASE_URL,
	});
	return instance;
};

export const getAsync = (
	url: string,
	params?: object,
): Promise<AxiosResponse> => {
	return axiosInstance().get(url, {
		params: params,
		paramsSerializer: function (params) {
			return qs.stringify(params, { arrayFormat: "repeat" });
		},
	});
};

