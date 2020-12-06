import axios, { AxiosResponse, AxiosInstance } from "axios";
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
): Promise<AxiosResponse> => {
	return axiosInstance().get(url);
};

