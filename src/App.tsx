import React from "react";
import "./App.css";
import Menu from "./components/shared/menu";
import HomeComponent from "./components/pages/landing/home";
import { Loading } from "./components/shared/loading";

const App: React.FC = () => {
	return (
		<div className="App container">
			<Loading></Loading>
			<Menu></Menu>
			<HomeComponent></HomeComponent>
		</div>
	);
};

export default App;
