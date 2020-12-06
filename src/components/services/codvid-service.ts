import moment from 'moment';
import { getAsync } from './../../helpers/http-client';
export const getCountriesAsync = (
) => {
	return getAsync("countries");
};

export const getCovidStatusByCountry = (countryCode: string, from: Date, to: Date) => {
	const formatDate = (date: Date) => {
		return moment(date).format("YYYY-MM-DD");
	}
	return getAsync(`country/${countryCode}?from=${formatDate(from)}T00:00:00Z&to=${formatDate(to)}T00:00:00Z`);
};

