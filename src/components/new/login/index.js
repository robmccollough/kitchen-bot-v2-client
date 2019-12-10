import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import {
	Form,
	Input,
	Button,
	Header,
	Container,
	Segment
} from "semantic-ui-react";
import useForm from "react-hook-form";
import axios from "axios";
import history from "../history";
import "./index.css";

const Login = props => {
	console.log(props);

	const { handleSubmit, register, setValue, setError } = useForm();

	const [isLoggedIn, toggleLogin] = useState(false);

	const [errMessage, setErrMessage] = useState(false);

	//emulating componentDidMount
	useEffect(() => {
		register({ name: "email" }, { required: true });
		register({ name: "password" }, { required: true });
	}, []);

	const onSubmit = async values => {
		return await axios({
			method: "post",
			url: `${process.env.REACT_APP_SERVER_PATH}/login`,
			data: {
				email: values.email,
				password: values.password
			}
		})
			.then(result => {
				if (result.data.authenticated) {
					history.push("/login");
					toggleLogin(true);
				} else {
					console.log(result);
					setErrMessage(result.data.err);
				}
			})
			.catch(err => {
				console.log(err);
				setErrMessage(err.msg);
			});
	};

	return isLoggedIn ? (
		<Redirect exact from="login" to="home" />
	) : (
		<div className="login-page">
			<Form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<Header size="large" content="Login" />
				<Input
					name="email"
					placeholder="Email"
					label="Email"
					size="large"
					onChange={e => setValue("email", e.target.value)}
				/>
				<Input
					name="password"
					// type="password"
					placeholder="Password"
					size="large"
					label="Password"
					onChange={e => setValue("password", e.target.value)}
				/>
				<Button className="login-button" type="submit" content="Login" />
				{errMessage && (
					<Form.Field>
						<Segment inverted raised color="red" content={errMessage} />
					</Form.Field>
				)}

				<Link from="/login" to="/register">
					Dont have an acccount? Create One
				</Link>
			</Form>
		</div>
	);
};

export default Login;
