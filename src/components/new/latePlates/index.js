import React, { useState, useEffect } from "react";
import {
	Container,
	Segment,
	Dimmer,
	Checkbox,
	Header,
	Divider,
	Button,
	Icon,
	Loader
} from "semantic-ui-react";
import axios from "axios";

import "./index.css";

/*
 To use this component inside another example:

import TemplateComponent from '{path-to-file}/template'

const SomeOtherComponent = (props) => {

    return <div>
        <TemplateComponent [declare props here eg:] message="Hello!"/>
    </div>
}

*/

//each one gets data initally, but can update itself if completed
const LatePlate = props => {
	const [isComplete, setIsComplete] = useState(props.complete);

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
				complete: !isComplete
			}
		}).then(r => {
			setIsComplete(r.data.complete);
		});
	};

	return (
		<div className="single-lateplate">
			<div className="lp-order">
				<Header size="medium" content={props.recipient} />
				{props.food && (
					<Header size="medium" color="grey" content={props.food} />
				)}
			</div>
			<div
				className={`lp-complete-button${isComplete ? " complete-green" : ""}`}
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
			console.log(result);
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
				<Checkbox
					toggle
					checked={incompleteOnly}
					onChange={(e, { data }) => {
						console.log(e.target);
						setIncompleteOnly(data);
					}}
				/>
				<Icon
					name="refresh"
					color="grey"
					onClick={() => fetchData()}
					size="large"
				/>
			</div>

			<div className="lateplate-list">
				{isLoading ? (
					<Dimmer active>
						<Loader size="huge" />
					</Dimmer>
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
								id={lp._id}
								complete={lp.complete}
								recipient={lp.recipient}
								food={lp.withFood ? lp.food : false}
							/>
						))
				) : (
					latePlates.map((lp, index) => (
						<LatePlate
							key={index}
							authtoken={props.authtoken}
							id={lp._id}
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
