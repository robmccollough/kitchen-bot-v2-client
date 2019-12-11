import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";

/*
 To use this component inside another example:

import TemplateComponent from '{path-to-file}/template'

const SomeOtherComponent = (props) => {

    return <div>
        <TemplateComponent [declare props here eg:] message="Hello!"/>
    </div>
}

*/
const MenuDisplay = props => {
  //hook declarations go here
  let [menu, setMenu] = useState(false);
  useEffect(async () => {
    let result = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_PATH}/menu`,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRmMDM0N2U2Mjc2MGYwMDI0MzRiMzY5Iiwicm9sZSI6InVzZXIiLCJwYXNzd29yZCI6InRvcmRpbmcxMDQiLCJpYXQiOjE1NzYwMjQzNjR9.QRYLI2cIKxi0Uz8NHcuPd3l0zojpri68YzTkgRpX9Vc"
      }
    });

    setMenu(result.data.data.food);
  }, []);

  return <div>{JSON.stringify(menu)}</div>;
};

export default MenuDisplay;
