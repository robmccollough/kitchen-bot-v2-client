import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
	Container,
	TextArea,
	Header,
	Button,
	Segment,
	Search
} from "semantic-ui-react";
import { MenuCard } from "../menu";
import axios from "axios";
import "./index.css";

const SearchMenu = props => {
	const [menus, setMenus] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState("");
	const [results, setResults] = useState([]);
	const [found, setFound] = useState(
		<Header content="Menu Data Appears Here" size="large" color="grey" />
	);

	const handleSearchChange = (e, { value }) => {
		setIsLoading(true);
		setValue(value);
		//find the matcthing menu

		if (value.length < 3) {
			return;
		}

		setTimeout(() => {
			//unpackage menus
			let foods = [];
			menus.forEach(menu => {
				Object.keys(menu.food).forEach(key => {
					let { main, side } = menu.food[key];
					foods.push(main, side);
				});
			});

			const re = new RegExp(_.escapeRegExp(value), "i");
			const isMatch = food => {
				return re.test(food);
			};
			//slow ops

			let res = Array.from(new Set(_.filter(foods, isMatch)));

			setIsLoading(false);
			setResults(
				res.map((r, index) => {
					return { title: r, id: index };
				})
			);
		}, 300);
	};

	const fecthMenus = async () => {
		await axios({
			method: "get",
			url: process.env.REACT_APP_SERVER_PATH + "/menu/all",
			headers: {
				authorization: "Bearer " + props.authtoken
			}
		}).then(r => {
			console.log(r);
			setMenus(r.data);
		});
	};

	useEffect(() => {
		fecthMenus();
	}, []);

	return (
		<div className="search component">
			<Header
				className="search-header-text"
				size="small"
				dividing
				content="Search For A Menu Item"
				subheader="Get the menu"
				textAlign="center"
			/>
			<Search
				loading={isLoading}
				onResultSelect={(e, { result }) => {
					setValue(result.title);
					setFound(
						<Segment
							content={
								menus.find(menu => {
									return Object.keys(menu.food).find(
										key =>
											menu.food[key].main.includes(result.title) ||
											menu.food[key].main.includes(result.title)
									);
								}).date
							}
						/>
					);
				}}
				onSearchChange={_.debounce(handleSearchChange, 500, {
					leading: true
				})}
				minCharacters={3}
				results={results}
				value={value}
				{...props}
			/>

			<div className="search-results">{found}</div>
		</div>
	);
};

export default SearchMenu;
