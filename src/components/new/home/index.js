import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import { Header, Image, Grid } from "semantic-ui-react";
import LatePlates from "../latePlates";
import Request from "../request";
import MenuDisplay from "../menu";
import "./index.css";

const Home = props => {
	//put the cookie check/redirect here

	let token = localStorage.getItem("token");

	return (
		<div className="home-page">
			<Header className="home-header" size="huge" textAlign="center">
				KITCHEN
				{<Image src={require("./chef-hat.png")} />}
				B0T
			</Header>
			<div className="home-grid">
				<MenuDisplay authtoken={token} />
				<div className="metrics component" />
				<Request authtoken={token} />
				<LatePlates authtoken={token} />
			</div>
		</div>
	);
};

export default Home;
