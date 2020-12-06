import moment from 'moment';
import { getAsync } from './../../helpers/http-client';
export const getCountriesAsync = (
) => {
	return getAsync("countries");
};

export const getCovidStatusByCountry = (countryCode: string, from: Date, to: Date) => {
	const formatDate = (date: Date) => {
		return moment(date).format("YYYY-MM-DD") + "T00:00:00Z";
	}
	return getAsync(`country/${countryCode}?from=${formatDate(from)}&to=${formatDate(to)}`);
};

