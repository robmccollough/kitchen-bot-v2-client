import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Header, Image, Grid } from "semantic-ui-react";
import "./index.css";

const Home = props => {
  //put the cookie check/redirect here
  return (
    <div className="home-page">
      <Header className="home-header" size="huge" textAlign="center">
        KITCHEN
        {<Image src={require("./chef-hat.png")} />}
        B0T!!!
      </Header>
      <Grid className="home-grid" divided="vertically">
        <Grid.Row columns={3}>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={1}></Grid.Column>
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
