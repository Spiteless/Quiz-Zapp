import React from 'react';
import { withRouter } from "react-router-dom";
// import '../App.css';
// import axios from 'axios';


const Dashboard = (props) => {

  const gotoLobby = () => {
    props.history.push("/lobby")
  }

    return(
      <div onClick={() => {gotoLobby()}} className="DashboardContainer" >
        <h1> Dashboard </h1>
      </div>
    )
};



export default (withRouter(Dashboard));