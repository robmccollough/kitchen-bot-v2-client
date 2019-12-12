import React, { useState, useEffect } from "react";
import { Header, Image, Grid, Card, Segment, Divider } from "semantic-ui-react";
import axios from "axios";
import "./index.css";

const Metric = props => {
	//hook declarations go here
	async function fetchMetric() {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_SERVER_PATH}/metric`,
			headers: {
				authorization: "Bearer " + props.authtoken
			}
		}).then(res => {
			if (res.status == 200) {
				setMetrics(res.data);
			}
		});
	}

	const [metrics, setMetrics] = useState([]);

	useEffect(() => {
		fetchMetric();
	}, []);

	return (
		<div className="metric component">
			{/* <div className="metrics-grid">
					<Segment>
            <h6>Menu Metrics</h6>
            <p>People Asked For Menus: {metrics[0] && metrics[0].asks} Times</p>
            <p>Total Number of Menus Created: {metrics[0] && metrics[0].total} </p>
            <h6>Dinner Metrics</h6>
            <p>Dinner Was Asked For: {metrics[2] && metrics[2].asks} Times</p>
            <p>Total Number Of Dinners Had: {metrics[2] && metrics[2].total} </p>
            <h6>Lateplate Metrics</h6>
            <p>Total Lateplates Asked For: {metrics[1] && metrics[1].asks} </p>
            <p>Total Lateplates Completed: {metrics[1] && metrics[1].total} </p>
          </Segment>
        </Card> */}
			{/* <div className="flex-container"> */}
			<div className="menus-requested-box">
				<div>
					<Header size="huge">{metrics[0] && metrics[0].asks}</Header>
				</div>
				<div>
					<Header size="small" content="Menus Requested" />
				</div>
			</div>

			<div className="menus-created-box">
				<div>
					<Header size="huge">{metrics[0] && metrics[0].total}</Header>
				</div>
				<div>
					<Header size="small" content="Menus Created" />
				</div>
			</div>
			<div className="lateplates-box">
				<div className="lateplates-header-box">
					<div>
						<Header size="huge">
							{metrics[1] && metrics[1].total} / {metrics[1] && metrics[1].asks}
						</Header>
					</div>
				</div>
				<div className="lateplates-data-box">
					<div>
						<Header size="small" content="LatePlates Completed" />
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default Metric;
