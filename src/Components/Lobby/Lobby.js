import React from 'react';
import { withRouter, Link } from "react-router-dom";


const Lobby = (props) => {



  return (
    <div className="lobbyContainer" >
      <h1> Lobby </h1>
      <Link to='/game'>
        <h2> Link to /Game </h2>
      </Link>
    </div>
  )
};



export default (withRouter(Lobby));