import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import useForm from "react-hook-form";
import axios from "axios";
import {
	Form,
	Button,
	Container,
	Header,
	Popup,
	Icon,
	Segment
} from "semantic-ui-react";
import "./index.css";

const Register = () => {
	const {
		register,
		errors,
		setError,
		handleSubmit,
		setValue,
		getValues,
		triggerValidation
	} = useForm();

	useEffect(() => {
		register(
			{ name: "email", type: "custom" },
			{ required: "Please enter a valid email" }
		);
		register(
			{ name: "password", type: "custom" },
			{ required: "Please enter a password" }
		);
		register(
			{ name: "confirm", type: "custom" },
			{
				validate: value =>
					value === getValues().password || "Passwords must match"
			}
		);
		register({ name: "gm_link", type: "custom" });
	}, []);

	const [addLink, setAddLink] = useState(false);

	const [renderAuth, setRenderAuth] = useState(false);

	//wait until registration is complete
	const onSubmit = async (data, e) => {
		return await axios({
			method: "post",
			url: process.env.REACT_APP_SERVER_PATH + "/user",
			data: {
				email: data.email,
				password: data.password
			}
		})
			.then(result => {
				if (result.data.success) {
					console.log(result);
					setAddLink(true);
				}
			})
			.catch(err => setError("create", "bad-create", err.msg));
	};

	return (
		<div className={"register-page"}>
			<Form className="register-form" onSubmit={handleSubmit(onSubmit)}>
				<Header className="register-header" content="Create An Account" />

				<Popup
					trigger={
						<Form.Input
							name="email"
							fluid
							label="Email"
							placeholder="Email"
							onChange={async (e, { name, value }) => {
								setValue(name, value);
								await triggerValidation({ name });
							}}
							error={errors.email ? true : false}
						/>
					}
					content={errors.email && errors.email.message}
					open={errors.email ? true : false}
					position="right center"
				/>
				<Popup
					trigger={
						<Form.Input
							name="password"
							fluid
							label="Password"
							placeholder="Password"
							onChange={async (e, { name, value }) => {
								setValue(name, value);
								await triggerValidation({ name });
							}}
							error={errors.password ? true : false}
						/>
					}
					content={errors.password && errors.password.message}
					open={errors.password ? true : false}
					position="right center"
				/>
				<Popup
					trigger={
						<Form.Input
							name="confirm"
							fluid
							label="Confirm Password"
							placeholder="Confirm Password"
							onChange={async (e, { name, value }) => {
								setValue(name, value);
								await triggerValidation({ name });
							}}
							error={errors.confirm ? true : false}
						/>
					}
					content={errors.confirm && errors.confirm.message}
					open={errors.confirm ? true : false}
					position="right center"
				/>

				<Form.Group>
					<Form.Checkbox
						name="gm_link"
						label="Link GroupMe Account?"
						onChange={async (e, { name, checked }) => {
							setValue(name, checked);
							await triggerValidation({ name });
						}}
						error={errors.gm_link ? true : false}
					/>

					<Popup
						content="Allows linking to groupme lateplates"
						trigger={<Icon name="question" size="large" color="grey" />}
						position="right center"
					/>
				</Form.Group>

				{addLink ? (
					<a href="https://oauth.groupme.com/oauth/authorize?client_id=iPV0ihYHVPnlo1KEev9nsJMWMm0xgz8gvpUvtE5pPqaH6Hcf">
						Go to GroupMe
					</a>
				) : (
					<Button type="submit">Register</Button>
				)}
				{errors.create && (
					<Segment color="red" inverted content={errors.create.message} />
				)}
			</Form>
		</div>
	);
};

export default Register;

// const Register = (props) => {

//     const {handleSubmit, register, errors, getValues} = useForm();
//     console.log(errors)
//     const onSubmit = values => {
//         console.log(values)
//     }

//     //returns true if email is use
//     const checkEmail = async (email) => {
//         return await axios({
//             method: 'post',
//             url: '/user/check',
//             body:{
//                 email: email
//             }
//         }).then( result => {
//             return result.in_use
//         })
//     }

//     //put the cookie check/redirect here
//     return <Container centered className="register-page">
//         <Form className="register-form" onSubmit={handleSubmit(onSubmit)}>

//         <input type="text" placeholder="Email" name="Email" ref={register({
//             required: true,
//             pattern: /^\S+@\S+$/i,
//             validate: value => checkEmail(value)
//             })} />
//             {errors.email && "Email already in use"}
//         <input type="text" placeholder="Password" name="Password" ref={register({required: true})} />
//         <input type="text" placeholder="Confirm Password" name="Password" ref={register({required: true, validate: value => {
//             console.log(getValues())
//         }})} />
//         <input type="checkbox" placeholder="Link GroupMe Account?" name="Link GroupMe Account?" ref={register} />

//         <input type="submit" />

//         </Form>
//     </Container>

// }

// export default Register
