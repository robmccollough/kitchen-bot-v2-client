import React from "react";
import "./index.css";
import { Header } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Provider, connect, withRouter } from "react-redux";
import Login from "../login";
import Register from "../register";
import HomeAdmin from "../homeAdmin";
import Home from "../home";
import history from "../history";

//Goal: Start at always being at login page, check for cookies->
// if cookie found, use credentials to log in and redirect to home
//if no cookie found, user logs in

const Root = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/home/admin" component={HomeAdmin} />
        <Route path="/login/" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <Redirect exact from="/" to="/home" />
    </Router>
  );
};

export default Root;
