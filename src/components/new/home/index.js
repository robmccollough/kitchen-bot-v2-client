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
import Bans from "../bans";

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
			<Grid className="home-grid" divided="vertically">
				<Grid.Row columns={3}>
					<Grid.Column width={2}></Grid.Column>
					<Grid.Column width={1}><Bans authtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRmMDMwN2Y2Mjc2MGYwMDI0MzRiMzY3Iiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiJwdyIsImlhdCI6MTU3NjAyODQyN30.oWXY27KdW2CUsQCNzKDPXSuCX1GGnUgqs09qGgW2Vas"/></Grid.Column>
				</Grid.Row>
				<Grid.Row columns={3}>
					<Grid.Column width={1}></Grid.Column>
					<Grid.Column width={2}></Grid.Column>
				</Grid.Row>
			</Grid>
			
		</div>
	);
};

export default Home;
