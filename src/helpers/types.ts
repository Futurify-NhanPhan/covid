import { type } from "os";

export type Country = {
	Country: string,
	ISO2: string,
}

export type SelectOption = {
	label: string,
	value: string,
}

export type CovidStatus = {
	Active: number
	City: string
	CityCode: string
	Confirmed: number
	Country: string
	CountryCode: string
	Date: string
	Deaths: number
	Lat: string
	Lon: string
	Province: string
	Recovered: number
}