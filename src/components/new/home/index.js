import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import { Header, Image, Grid } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import Metrics from "../metric"
import "./index.css";

const Home = props => {
	//put the cookie check/redirect here
  
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
					<Grid.Column width={1}><Metrics authtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRmMDJmYjI2Mjc2MGYwMDI0MzRiMzY0Iiwicm9sZSI6ImFkbWluIiwicGFzc3dvcmQiOiJoYSIsImlhdCI6MTU3NjAyNzAzMH0.baL5wKlBp_yU6kQ7YdCDQm-rsavAev7GiwhD7I1uD30"/></Grid.Column>
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
