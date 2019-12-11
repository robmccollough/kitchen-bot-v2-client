import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

const RequestBoxComponent = props => {

    const [request, setRequest] = useState('');

    const onSubmit = async () => {
		return await axios({
			method: "post",
			url: `${process.env.REACT_APP_SERVER_PATH}/request`,
			data: {
                request: request
			}
		}).then (
            //Remove input text
        );
    };

	return (
		<div class="requestBox">
			<Form onSubmit = {handleSubmit(onSubmit)} className="request-form">
				<Input class="requestInput"
					name="request"
					placeholder="Enter food request"
					label="Request"
                    size="large"
                    onChange= { (e, {value}) => setRequest(value) }
				/>
				<Button className="request-button" type="submit"/>
			</Form>
		</div>
	);
};

export default RequestBoxComponent;
