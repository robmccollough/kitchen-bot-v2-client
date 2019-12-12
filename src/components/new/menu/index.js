import React, { useState, useEffect } from "react";
import { Container, Header, Card, Loader, Segment } from "semantic-ui-react";
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

const MenuCard = props => {
	const { food, day, isLoading } = props;
	return (
		<Card className="menu-card" raised>
			<Card.Header content={day} textAlign="center" />
			<Card.Content>
				{isLoading ? (
					<Loader active size="large" />
				) : (
					<div>
						<h5>{food[day.toLowerCase()].main}</h5>
						<h6>{food[day.toLowerCase()].side}</h6>
					</div>
				)}
			</Card.Content>
		</Card>
	);
};

const MenuDisplay = props => {
	//hook declarations go here
	const [menu, setMenu] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios({
			method: "get",
			url: process.env.REACT_APP_SERVER_PATH + "/menu",
			headers: {
				authorization: "Bearer " + props.authtoken
			}
		}).then(res => {
			console.log(res);
			if (res.data.success) {
				setMenu(res.data.data);
				setIsLoading(false);
			}
		});
	}, []);

	return (
		<div className="menu component">
			<div className="menu-header">
				<Header
					dividing
					className="menu-header-text"
					size="large"
					content="Menu"
				/>
				<Segment
					className="menu-date"
					content={
						isLoading ? (
							<Loader size="small" active />
						) : (
							new Date(menu.date).toDateString()
						)
					}
				/>
			</div>

			<Card.Group
				className="menu-cards"
				centered
				textAlign="center"
				stackable
				itemsPerRow={5}
				content={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
					(day, index) => (
						<MenuCard
							key={index}
							isLoading={isLoading}
							food={menu.food}
							day={day}
						/>
					)
				)}></Card.Group>
		</div>
	);
};

export default MenuDisplay;
