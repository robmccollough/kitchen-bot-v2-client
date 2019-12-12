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

const RequestBox = props => {
	const [request, setRequest] = useState("");
	const [feedback, setFeedback] = useState(null);

	const onSubmit = async () => {
		await axios({
			method: "post",
			url: `${process.env.REACT_APP_SERVER_PATH}/request`,
			headers: {
				authorization: "Bearer " + props.authtoken
			},
			data: {
				request: request
			}
		}).then(result => {
			if (result.status == 200) {
				setRequest("");
				setFeedback(
					<Segment
						className="request-feedback"
						inverted
						color="green"
						content="Your request has been submitted"
					/>
				);
			} else {
				setFeedback(
					<Segment
						className="request-feedback"
						inverted
						color="red"
						content="There was a problem submitting the request"
					/>
				);
			}
		});
	};

	return (
		<div className="request component">
			<Header
				className="request-header-text"
				size="large"
				dividing
				content="Requests"
				textAlign="center"
			/>
			<TextArea
				className="request-input"
				value={request}
				placeholder={`\n  Comments, Questions, Requests`}
				onChange={(e, { value }) => setRequest(value)}
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

export default RequestBox;
