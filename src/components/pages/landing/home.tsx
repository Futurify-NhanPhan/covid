import React from "react";
import "./home.css";
import Select from 'react-select'
import { getCountriesAsync, getCovidStatusByCountry } from "../../services/codvid-service";
import { Country, CovidStatus, SelectOption } from "../../../helpers/types";
import { addLoading, removeLoading } from '../../shared/loading';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {};
type States = {
	countries: SelectOption[],
	covidStatuses: CovidStatus[],
	selectCountry: SelectOption,
	fromDate: Date,
	toDate: Date,
};
class HomeComponent extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
		this.state = {
			countries: [],
			covidStatuses: [],
			selectCountry: {} as SelectOption,
			fromDate: moment(new Date()).add(-4, "days").toDate(), // show update from last 4 days
			toDate: moment(new Date()).add(-1, "days").toDate(), // the api some time have error when we use current date (maybe because the time zone).
		}
	}

	async componentDidMount() {
		addLoading();
		let res = await getCountriesAsync()
		removeLoading();
		let countries: Country[] = res.data;
		let options = countries.map((country) => {
			return { value: country.ISO2, label: country.Country }
		});
		this.setState({ countries: options });
		// default select Viet Nam at the first time load
		let vietnam: SelectOption = { label: 'Viet Nam', value: 'VN' };
		this.onSelectCountry(vietnam)
	}

	async onSelectCountry(value: any) {
		let country: SelectOption = value;
		this.setState({ selectCountry: country }, this.refreshCovidStatuses)
	}

	async refreshCovidStatuses() {
		addLoading();
		let res = await getCovidStatusByCountry(this.state.selectCountry.value, this.state.fromDate, this.state.toDate);
		removeLoading();
		let covidStatuses = res.data as CovidStatus[];
		this.setState({ covidStatuses: covidStatuses });
	}

	formatNumber(number: number) {
		return number.toLocaleString('en-us');
	}
	async changeFromDate(date: Date) {
		this.setState({ fromDate: date }, this.refreshCovidStatuses)
	}

	async changeToDate(date: Date) {
		this.setState({ toDate: date }, this.refreshCovidStatuses);
	}

	render() {
		return (
			<div>
				{/* filter form */}
				<form data-testid="filterForm" className='col-md-12 row filter'>
					<div className='col-md-3' data-testid="countrySelect">
						<Select value={this.state.selectCountry} onChange={this.onSelectCountry.bind(this)} options={this.state.countries} />
					</div>
					<div className='col-md-3'>
						Từ: <DatePicker className="date-input" selected={this.state.fromDate} onChange={this.changeFromDate.bind(this)} />
					</div>
					<div className='col-md-3'>
						Đến: <DatePicker className="date-input" selected={this.state.toDate} onChange={this.changeToDate.bind(this)} />
					</div>
					<div className='col-md-3'>
						<button onClick={this.refreshCovidStatuses} className="btn btn-primary">Refresh</button>
					</div>
				</form>
				{/* status table */}
				<table data-testid="statusesTable" className="table">
					<thead>
						<tr>
							<th scope="col">Ngày</th>
							<th className="province" scope="col">Tỉnh (tọa độ) </th>
							<th scope="col">Tổng số ca nhiễm</th>
							<th scope="col">Đang điều trị</th>
							<th scope="col">Khỏi bệnh</th>
							<th scope="col">Tử vong</th>
						</tr>
					</thead>
					<tbody>
						{this.state.covidStatuses.reverse().map((c, i) => {
							return (
								<tr key={i}>
									<td>{moment(c.Date).format('DD-MM-YYYY')}</td>
									<td className="province">{c.Province} ({c.Lat}, {c.Lon})</td>
									<td className="status">{this.formatNumber(c.Confirmed)}</td>
									<td className="status active">{this.formatNumber(c.Active)}</td>
									<td className="status recovered">{this.formatNumber(c.Recovered)}</td>
									<td className="status deaths">{this.formatNumber(c.Deaths)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default HomeComponent;
