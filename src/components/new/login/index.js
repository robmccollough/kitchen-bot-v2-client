import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import { Form, Input, Button, Header, Container } from "semantic-ui-react";
import useForm from "react-hook-form";
import axios from "axios";

const Login = props => {
	const { handleSubmit, register, setValue, setError } = useForm();

	const [isLoggedIn, toggleLogin] = useState(false);
	//emulating componentDidMount
	useEffect(() => {
		register({ name: "email" }, { required: true });
		register({ name: "password" }, { required: true });
	}, []);

	useEffect(() => {}, []);

	const onSubmit = async values => {
		// return await axios({
		// 	method: "post",
		// 	url: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`,
		// 	data: {
		// 		email: values.email,
		// 		password: values.password
		// 	}
		// }).then(r => console.log(r));
		toggleLogin(!isLoggedIn);
		console.log(isLoggedIn);
	};

	return isLoggedIn ? (
		<Redirect exact from="login" to="home" />
	) : (
		<Container className="login-page">
			<Form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<Header size="large" content="Login" />
				<Form.Field>
					<Input
						name="email"
						placeholder="Email"
						label="Email"
						size="large"
						onChange={e => setValue("email", e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<Input
						name="password"
						// type="password"
						placeholder="Password"
						size="large"
						label="Password"
						onChange={e => setValue("password", e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<Button className="login-button" type="submit" content="Login" />
					<Button content="bruh" onClick={() => toggleLogin(true)} />
				</Form.Field>
			</Form>
		</Container>
	);
};

export default Login;
