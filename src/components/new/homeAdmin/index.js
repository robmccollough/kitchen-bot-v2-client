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
import PostMenu from "../postMenu";
import Bans from "../bans";
import SearchMenu from "../search";
import "./index.css";

const HomeAdmin = props => {
	//put the cookie check/redirect here

	let token = localStorage.getItem("token");

	return (
		<div className="home-page-admin">
			<Header className="home-header-admin" size="huge" textAlign="center">
				KITCHEN
				{<Image src={require("./chef-hat.png")} />}
				B0T
			</Header>

			<div className="home-grid-admin">
				<MenuDisplay authtoken={token} />
				<Metrics authtoken={token} />
				<Request authtoken={token} />
				<LatePlates authtoken={token} />
				<PostMenu authtoken={token} />
				<SearchMenu authtoken={token} />
				<BotPoster authtoken={token} />
				<Bans authtoken={token} />
				{/* <AllMenu/> */}
			</div>
		</div>
	);
};

export default HomeAdmin;
