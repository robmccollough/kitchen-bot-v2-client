import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import React from "react";
import { Header, Image, Grid } from "semantic-ui-react";
import LatePlates from "../latePlates";
import Request from "../request";
import MenuDisplay from "../menu";
import Metrics from "../metric";
import BotPoster from "../botPoster";
import "./index.css";
import Bans from "../bans";

const HomeAdmin = props => {
	//put the cookie check/redirect here

	let token = localStorage.getItem("token");

	return (
		<div className="home-page admin">
			<Header className="home-header" size="huge" textAlign="center">
				KITCHEN
				{<Image src={require("./chef-hat.png")} />}
				B0T
			</Header>

			<div className="home-grid">
				<MenuDisplay authtoken={token} />
				<Metrics authtoken={token} />
				<Request authtoken={token} />
				<LatePlates authtoken={token} />
			</div>

			<div className="admin-grid">
				<PostMenu authtoken={authoken} />
				<BotPoster authtoken={token} />
				<Bans authtoken={token} />
				{/* <AllMenu/> */}
			</div>
		</div>
	);
};

export default HomeAdmin;
