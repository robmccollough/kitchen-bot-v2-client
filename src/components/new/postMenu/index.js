import React, { useState, useEffect } from "react";
import { Container, Form, Header, Input, Button, Segment } from "semantic-ui-react";
import axios from "axios";
import useForm from "react-hook-form";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import "./index.scss";

const PostMenu = props => {

    useEffect(() => {
        //Monday
		register(
			{ name: "mainMonday", type: "custom" },
            { required: "Enter a valid main item" },
            { validate: value => value != "" }
        );
        register(
			{ name: "sideMonday", type: "custom" },
            { required: "Enter a valid side item" },
            { validate: value => value != "" }
        );

        //Tuesday
        register(
			{ name: "mainTuesday", type: "custom" },
            { required: "Enter a valid main item" },
            { validate: value => value != "" }
        );
        register(
			{ name: "sideTuesday", type: "custom" },
            { required: "Enter a valid side item" },
            { validate: value => value != "" }
        );

        //Wednesday
        register(
			{ name: "mainWednesday", type: "custom" },
            { required: "Enter a valid main item" },
            { validate: value => value != "" }
        );
        register(
			{ name: "sideWednesday", type: "custom" },
            { required: "Enter a valid side item" },
            { validate: value => value != "" }
        );

        //Thursday
        register(
			{ name: "mainThursday", type: "custom" },
            { required: "Enter a valid main item" },
            { validate: value => value != "" }
        );
        register(
			{ name: "sideThursday", type: "custom" },
            { required: "Enter a valid side item" },
            { validate: value => value != "" }
        );

        //Friday
        register(
			{ name: "mainFriday", type: "custom" },
            { required: "Enter a valid main item" },
            { validate: value => value != "" }
        );
        register(
			{ name: "sideFriday", type: "custom" },
            { required: "Enter a valid side item" },
            { validate: value => value != "" }
        );

	},[]);

    const { handleSubmit, register, setValue, errors, setError, reset } = useForm();

    const onSubmit = async (values) => {
        var newMenu = createMenu(values);
        return await axios({
            method: "post",
            url: `${process.env.REACT_APP_SERVER_PATH}/menu`,
            headers: { authorization: "Bearer " + props.authtoken },
            data: {
                food: newMenu
            }
        }).then(function() {
            updateMetrics();
            setValue("mainMonday", "");
        });
    };

    const updateMetrics = async () => {
		await axios({
			method: "put",
			url: `${process.env.REACT_APP_SERVER_PATH}/metric`,
			data: {
                metric: "menu",
                stat: "total"
            },
            headers: { authorization: "Bearer " + props.authtoken },
		});
    };

    function createMenu(values) {
        var food = {
            monday: {
                main: values.mainMonday,
                side: values.sideMonday
            },
            tuesday: {
                main: values.mainTuesday,
                side: values.sideTuesday
            },
            wednesday: {
                main: values.mainWednesday,
                side: values.sideWednesday
            },
            thursday: {
                main: values.mainThursday,
                side: values.sideThursday
            },
            friday: {
                main: values.mainFriday,
                side: values.sideFriday
            }
        };
        return food;
    }

	return (
		<div className="postMenu">
			<Form onSubmit = { handleSubmit(onSubmit) } className="post-menu-form">
				<Header size="large" content="Post Menu" />

                <Header size="medium" content="Monday" />
                <Input className="menu-input"
					name="mainMonday"
					placeholder="Main Item"
                    size="large"
                    onChange={e => setValue("mainMonday", e.target.value)}
				/>

				<Input className="menu-input"
					name="side-monday"
					placeholder="Side Item"
                    size="large"
                    onChange={e => setValue("sideMonday", e.target.value)}
				/>

                <Header size="medium" content="Tuesday" />
				<Input className="menu-input"
					name="main-tuesday"
					placeholder="Main Item"
                    size="large"
                    onChange={e => setValue("mainTuesday", e.target.value)}
				/>
				<Input className="menu-input"
					name="side-tuesday"
					placeholder="Side Item"
                    size="large"
                    onChange={e => setValue("sideTuesday", e.target.value)}
				/>

                <Header size="medium" content="Wednesday" />
				<Input className="menu-input"
					name="main-wednesday"
					placeholder="Main Item"
                    size="large"
                    onChange={e => setValue("mainWednesday", e.target.value)}
				/>
				<Input className="menu-input"
					name="side-wednesday"
					placeholder="Side Item"
                    size="large"
                    onChange={e => setValue("sideWednesday", e.target.value)}
				/>

                <Header size="medium" content="Thursday" />
				<Input className="menu-input"
					name="main-thursday"
					placeholder="Main Item"
                    size="large"
                    onChange={e => setValue("mainThursday", e.target.value)}
				/>
				<Input className="menu-input"
					name="side-thursday"
					placeholder="Side Item"
                    size="large"
                    onChange={e => setValue("sideThursday", e.target.value)}
				/>

                <Header size="medium" content="Friday" />
				<Input className="menu-input"
					name="main-friday"
                    placeholder="Main Item"
                    size="large"
                    onChange={e => setValue("mainFriday", e.target.value)}
				/>
				<Input className="menu-input"
                    name="side-friday"
					placeholder="Side Item"
                    size="large"
                    onChange={e => setValue("sideFriday", e.target.value)}
				/>
                <br></br>
                <Header className="invalid-form" size="small" content=""/>
                <br></br>
				<Button className="post-button" type="submit" content="Submit"/>
			</Form>
		</div>
	);
};

export default PostMenu;
