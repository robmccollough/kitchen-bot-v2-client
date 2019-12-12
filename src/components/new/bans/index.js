import React, { useState, useEffect } from "react";
import { List, Header, Table, Label, Checkbox } from "semantic-ui-react";
import axios from "axios";
import "./index.css";

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
	const [activeOnly, setActiveOnly] = useState(true);

	useEffect(() => {
		fetchBans();
	}, []);

	// console.log("^bans list");

	return (
		<div className="bans component">
			<div className="bans-header">
				<Header
					size="large"
					className="bans-header-text"
					textAlign="center"
					content="Bans"
				/>
				<div className="toggle-active-only">
					<Label content="Show active only" />
					<Checkbox
						toggle
						checked={activeOnly}
						onChange={(e, { checked }) => {
							setActiveOnly(checked);
							fetchBans();
						}}
					/>
				</div>
			</div>

			<Table className="bans-table" celled>
				<Table.Header>
					<Table.Row textAlign="center">
						<Table.HeaderCell singleLine>User</Table.HeaderCell>
						<Table.HeaderCell singleLine>Date</Table.HeaderCell>
						<Table.HeaderCell singleLine>Banned by</Table.HeaderCell>
						<Table.HeaderCell singleLine>Active</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{activeOnly
						? bans
								.filter(b => b.active)
								.map((ban, index) => (
									<Table.Row key={index} textAlign="center">
										<Table.Cell singleLine>{ban.user_id}</Table.Cell>
										<Table.Cell singleLine>{ban.created_at}</Table.Cell>
										<Table.Cell singleLine>{ban.created_by}</Table.Cell>
										<Table.Cell singleLine>
											{ban.active ? "Active" : "Inactive"}
										</Table.Cell>
									</Table.Row>
								))
						: bans.map((ban, index) => (
								<Table.Row key={index} textAlign="center">
									<Table.Cell singleLine>{ban.user_id}</Table.Cell>
									<Table.Cell singleLine>{ban.created_at}</Table.Cell>
									<Table.Cell singleLine>{ban.created_by}</Table.Cell>
									<Table.Cell singleLine>
										{ban.active ? "Active" : "Inactive"}
									</Table.Cell>
								</Table.Row>
						  ))}
				</Table.Body>
			</Table>
		</div>
	);
};
export default Bans;
