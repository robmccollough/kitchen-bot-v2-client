import React, { useState, useEffect } from "react";
import {
	Container,
	Form,
	Header,
	Label,
	Input,
	Button,
	Segment
} from "semantic-ui-react";
import axios from "axios";
import useForm from "react-hook-form";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import "./index.css";

let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const PostMenu = props => {
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		errors,
		setError,
		reset
	} = useForm();

	const [feedback, setFeedback] = useState(false);

	useEffect(() => {
		weekdays.forEach(day => {
			register(
				{ name: `main${day}`, type: "custom" },
				{ required: "Enter a valid main item" }
			);
			register(
				{ name: `side${day}`, type: "custom" },
				{ required: "Enter a valid side item" }
			);
		});
	}, []);

	const onSubmit = async values => {
		var newMenu = createMenu(values);

		await axios({
			method: "post",
			url: `${process.env.REACT_APP_SERVER_PATH}/menu`,
			headers: { authorization: "Bearer " + props.authtoken },
			data: {
				food: newMenu
			}
		})
			.then(function() {
				updateMetrics();
				setFeedback(
					<Segment
						className="request-feedback"
						inverted
						color="green"
						content="Your post has been sent"
						onClick={() => setFeedback(false)}
					/>
				);
				reset();
			})
			.catch(err => setError("submit", "Menu Upload Failed"));
	};

	const updateMetrics = async () => {
		await axios({
			method: "put",
			url: `${process.env.REACT_APP_SERVER_PATH}/metric`,
			data: {
				metric: "menu",
				stat: "total"
			},
			headers: { authorization: "Bearer " + props.authtoken }
		});
	};

	function createMenu(values) {
		var food = {
			monday: {
				main: values.mainMonday,
				side: values.sideMonday
			},
			tuesday: {
				main: values.mainTuesday,
				side: values.sideTuesday
			},
			wednesday: {
				main: values.mainWednesday,
				side: values.sideWednesday
			},
			thursday: {
				main: values.mainThursday,
				side: values.sideThursday
			},
			friday: {
				main: values.mainFriday,
				side: values.sideFriday
			}
		};
		return food;
	}

	return (
		<div className="postmenu component">
			<Form onSubmit={handleSubmit(onSubmit)} className="postmenu-form">
				<Header
					size="large"
					className="postmenu-header"
					content="Post A Menu"
					dividing
				/>
				{weekdays.map((day, index) => (
					<div key={index} className="day-container">
						<Label content={day} size="big" />
						<div className="day-inputs">
							<Input
								className="day-input"
								name={`main${day}`}
								placeholder="Main Item"
								size="large"
								onChange={e => setValue(`main${day}`, e.target.value)}
							/>
							<Input
								className="day-input"
								name={`side${day}`}
								placeholder="Side Item"
								size="large"
								onChange={e => setValue(`side${day}`, e.target.value)}
							/>
						</div>
					</div>
				))}
				{errors.submit && (
					<Segment content={errors.submit} color="red" inverted />
				)}

				{feedback}

				<Button className="post-button" type="submit" content="Submit" />
			</Form>
		</div>
	);
};

export default PostMenu;
