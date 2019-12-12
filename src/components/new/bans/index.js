import React, {useState,useEffect} from "react";
import { List } from 'semantic-ui-react';
import axios from "axios";

const Bans = (props) => {
    //const [value, handleChange] = useState('onClick');
    async function fetchBans(){
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_PATH}/ban`,
            headers: {
                authorization: 'Bearer ' + props.authtoken
        }
        }).then(res => {
            if(res.status == 200){
                setBans(res.data)
            }
        })
    };
    
    const[bans, setBans] = useState([]);
    
    useEffect(() => {
        fetchBans();
    }, {});
    
    console.log(bans);
    const banList=(
        <div>
            <List>
            </List>
        </div>
        
      )
    //for(let i =0; i<bans.length;i++){
        //banList.append(bans[i])
   //}
      //<List.Item>Apples</List.Item>
    
}
export default Bans;