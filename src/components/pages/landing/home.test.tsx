import React from "react";
import HomeComponent from "./home";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { shallow, configure, mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() });
function renderHomeComponent() {
	return render(<HomeComponent />);
}

test("renders without crashing", () => {
	renderHomeComponent();
});

test("should render the form", async () => {
	const homeComponent = renderHomeComponent();
	expect(await homeComponent.findByTestId("filterForm")).not.toBeNull;

});


test("should render the table", async () => {
	const homeComponent = renderHomeComponent();
	expect(await homeComponent.findByTestId("statusesTable")).not.toBeNull;

});

test("should select Viet Nam as default", async () => {
	const homeComponent = renderHomeComponent();
	waitFor(async () => {
		const selectCountry = await homeComponent.findByTestId("countrySelect");
		const select = await selectCountry.querySelector(".css-1uccc91-singleValue");
		expect(select?.innerHTML).toEqual("Viet Nam");
	});
});


test("should render correct margin, have correct class", async () => {
	const homeComponent = renderHomeComponent();
	expect(homeComponent.getByTestId("filterForm")).toHaveClass('filter');
	expect(homeComponent.getByTestId("statusesTable")).toHaveClass('table');
	expect(homeComponent.getByTestId("filterForm")).not.toHaveStyle('margin-left: 50px');
	expect(homeComponent.getByTestId("filterForm")).not.toHaveStyle('margin-right: 50px');

});

test('event refreshCovidStatuses have been called when user click on Refresh button', () => {
	const refreshCovidStatuses = jest.spyOn(HomeComponent.prototype, 'refreshCovidStatuses');
	const component = shallow(<HomeComponent />);
	component.find('button').simulate('click');
	component.update();
	expect(refreshCovidStatuses).toHaveBeenCalled();
});


