import React, { useState, useEffect } from "react";
import { List, Header, Table } from "semantic-ui-react";
import axios from "axios";

const Bans = props => {
	//const [value, handleChange] = useState('onClick');
	async function fetchBans() {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_SERVER_PATH}/ban`,
			headers: {
				authorization: "Bearer " + props.authtoken
			}
		}).then(res => {
			if (res.status == 200) {
				setBans(res.data);
			}
		});
	}

	const [bans, setBans] = useState([]);

	useEffect(() => {
		fetchBans();
	}, {});

	//console.log(bans);
	// console.log("^bans list");

	return (
		<Table celled>
			<Table.Header>
				<Table.Row textAlign="center">
					<Table.HeaderCell singleLine>User</Table.HeaderCell>
					<Table.HeaderCell singleLine>Date</Table.HeaderCell>
					<Table.HeaderCell singleLine>Banned by</Table.HeaderCell>
					<Table.HeaderCell singleLine>Active</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{bans.map(ban => (
					<Table.Row textAlign="center">
						<Table.Cell singleLine>{ban.user_id}</Table.Cell>
						<Table.Cell singleLine>{ban.created_at}</Table.Cell>
						<Table.Cell singleLine>{ban.created_by}</Table.Cell>
						<Table.Cell singleLine>{ban.active}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
	//for(let i =0; i<bans.length;i++){
	//banList.append(bans[i])
	//}
	//<List.Item>Apples</List.Item>
};
export default Bans;
