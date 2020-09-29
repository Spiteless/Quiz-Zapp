import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import { SocketContext } from '../Context/Context';
// import '../App.css';
// import axios from 'axios';


const Profile = (props) => {

  const context = useContext(SocketContext)
  console.log(context)
  console.log('testing here too')
    return(
      <div className="profileContainer" >
          <h1> Profile </h1>
          {console.log('we are here')}
      </div>
    )
};



export default (withRouter(Profile));