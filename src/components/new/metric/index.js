import React, { useState, useEffect } from "react";
import { Header, Image, Grid } from "semantic-ui-react";
import axios from 'axios';


const Metric = props => {
    //hook declarations go here
    async function fetchMetric() {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER_PATH}/metric`,
        headers: {
          authorization: "Bearer " + props.authtoken
              }
      }).then( res => {
              if(res.status == 200){
                  setMetrics(res.data)
              }
          })
      };

	const [metrics, setMetrics] = useState([])
	
	useEffect(() => {
        fetchMetric()
	}, []);
    

    console.log(metrics)

    return (
			<Grid className="metrics-grid" divided="vertically">
				<Grid.Column width={3}>
					<Grid.Row>
            <h1>Menu Metrics</h1>
            <h3>People Asked For Menus: {metrics[0] && metrics[0].asks} Times</h3>
            <h3>Total Number of Menus Created: {metrics[0] && metrics[0].total} </h3>
          </Grid.Row>
					<br></br>
					<br></br>
					<Grid.Row>
            <h1>Dinner Metrics</h1>
            <h3>Dinner Was Asked For: {metrics[2] && metrics[2].asks} Times</h3>
            <h3>Total Number Of Dinners Had: {metrics[2] && metrics[2].total} </h3>
          </Grid.Row>
					<br></br>
					<br></br>
          <Grid.Row>
            <h1>Lateplate Metrics</h1>
            <h3>Total Lateplates Asked For: {metrics[1] && metrics[1].asks} </h3>
            <h3>Total Lateplates Completed: {metrics[1] && metrics[1].total} </h3>
          </Grid.Row>
				</Grid.Column>
			</Grid>
    );
};

export default Metric;