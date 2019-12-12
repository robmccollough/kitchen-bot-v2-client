import React, { useState, useEffect } from "react";
import {
	Container,
	TextArea,
	Header,
	Button,
	Segment
} from "semantic-ui-react";
import axios from "axios";
import "./index.css";

const BotPoster = props => {
	const [message, setMessage] = useState("");
	const [feedback, setFeedback] = useState(null);

	const onSubmit = async () => {
		if (message == "") {
			setFeedback(
				<Segment
					className="request-feedback"
					inverted
					color="red"
					content="Request cannot be blank"
					onClick={() => setFeedback(false)}
				/>
			);
			return;
		}

		await axios({
			method: "post",
			url: `https://api.groupme.com/v3/bots/post`,
			data: {
				bot_id: process.env.REACT_APP_BOT_ID,
				text: message
			}
		})
			.then(result => {
				setMessage("");
				setFeedback(
					<Segment
						className="request-feedback"
						inverted
						color="green"
						content="Your post has been sent"
						onClick={() => setFeedback(false)}
					/>
				);
			})
			.catch(err =>
				setFeedback(
					<Segment
						className="request-feedback"
						inverted
						color="red"
						content="There was a problem sending your post"
						onClick={() => setFeedback(false)}
					/>
				)
			);
	};

	return (
		<div className="botposter component">
			<Header
				className="request-header-text"
				size="large"
				dividing
				content={`\n\tPost a message as KitchenBot`}
				textAlign="center"
			/>
			<TextArea
				className="request-input"
				value={message}
				placeholder={`Your message here`}
				onChange={(e, { value }) => setMessage(value)}
			/>
			<div className="request-footer">
				{feedback !== null && feedback}
				<Button
					className="request-submit"
					color="grey"
					content="Submit"
					onClick={onSubmit}
				/>
			</div>
		</div>
	);
};

export default BotPoster;
