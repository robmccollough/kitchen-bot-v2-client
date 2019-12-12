import React, { useState, useEffect } from "react";
import {
	Container,
	Segment,
	Dimmer,
	Checkbox,
	Header,
	Divider,
	Label,
	Button,
	Icon,
	Loader
} from "semantic-ui-react";
import axios from "axios";

import "./index.css";

function formatAMPM(adate) {
	let date = new Date(adate);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? "pm" : "am";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var strTime = hours + ":" + minutes + " " + ampm;
	return strTime;
}

//each one gets data initally, but can update itself if completed
const LatePlate = props => {
	// const [isComplete, setIsComplete] = useState(props.complete);

	const completeSelf = () => {
		//complete, then refectch

		axios({
			method: "put",
			url: process.env.REACT_APP_SERVER_PATH + "/lp",
			headers: {
				authorization: "Bearer " + props.authtoken
			},
			data: {
				lp_id: props.id,
				complete: !props.complete
			}
		}).then(r => {
			props.refetch();
		});
	};
	return (
		<div className="single-lateplate">
			<div className="lp-time">
				<Header size="small" color="grey" content={formatAMPM(props.date)} />
			</div>
			<div className="lp-order">
				<Header size="medium" content={props.recipient} />
				{props.food && (
					<Header size="medium" color="grey" content={props.food} />
				)}
			</div>
			<div
				className={`lp-complete-button${
					props.complete ? " complete-green" : ""
				}`}
				onClick={completeSelf}
			/>
		</div>
	);
};

const LatePlates = props => {
	//hook declarations go here

	const [latePlates, setLatePlates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [incompleteOnly, setIncompleteOnly] = useState(false);

	//inital data fetch

	const fetchData = async () => {
		await axios({
			method: "get",
			url: process.env.REACT_APP_SERVER_PATH + "/lp",
			headers: {
				authorization: "Bearer " + props.authtoken
			}
		}).then(result => {
			if (result.data) {
				//sort by time
				setLatePlates(result.data.sort((a, b) => a.created_at - b.create_at));
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="lateplate component">
			<div className="lateplate-header">
				<Header
					size="large"
					className="lateplate-header-text"
					textAlign="center"
					content="LatePlates"
				/>
				<div className="toggle-complete-only">
					<Label content="Show incomplete only" />
					<Checkbox
						toggle
						checked={incompleteOnly}
						onChange={(e, { checked }) => {
							setIncompleteOnly(checked);
						}}
					/>
				</div>

				<Icon
					name="refresh"
					color="grey"
					onClick={() => fetchData()}
					size="large"
				/>
			</div>

			<div className="lateplate-list">
				{isLoading ? (
					<Loader size="huge" active inverted />
				) : latePlates.length < 1 ? (
					<Header
						size="medium"
						color="grey"
						content="There are no lateplates for today yet"
					/>
				) : incompleteOnly ? (
					latePlates
						.filter(lp => !lp.complete)
						.map((lp, index) => (
							<LatePlate
								key={index}
								authtoken={props.authtoken}
								date={lp.created_at}
								id={lp._id}
								complete={lp.complete}
								recipient={lp.recipient}
								refetch={fetchData}
								food={lp.withFood ? lp.food : false}
							/>
						))
				) : (
					latePlates.map((lp, index) => (
						<LatePlate
							key={index}
							authtoken={props.authtoken}
							date={lp.created_at}
							id={lp._id}
							refetch={fetchData}
							complete={lp.complete}
							recipient={lp.recipient}
							food={lp.withFood ? lp.food : false}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default LatePlates;
