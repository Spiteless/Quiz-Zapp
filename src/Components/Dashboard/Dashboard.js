import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Login from './Login';
import Register from './Register';
// import './Dashboard.scss';
import '../../css/Dashboard.css';
import logo from './sample-logo.jpg';
// import axios from 'axios';


const Dashboard = (props) => {
  const [loginIsDisplayed, setLoginIsDisplayed] = useState(false);
  const [registerIsDisplayed, setRegisterIsDisplayed] = useState(false);

  const toggleLogin = () => {
    setLoginIsDisplayed(!loginIsDisplayed)
    if(registerIsDisplayed){
      return setRegisterIsDisplayed(!registerIsDisplayed)
    }};
  const toggleRegister = () => {
    setRegisterIsDisplayed(!registerIsDisplayed);
    if(loginIsDisplayed){
      return setLoginIsDisplayed(!loginIsDisplayed)
    }};
    

  return(
      <div className="dashboardContainer" >
        <div className='grayBar'></div>
        <img src={logo} alt='logo'/> {/* import logo, and fix the position over the gray bar */}
        <h1> Quiz Zapp </h1>
        <div className='buttonBar'>
          <Link to='/game/anon'>
            <button>Quick Start</button>
          </Link>
          <button onClick={() => toggleLogin()}>Login</button>
          <button onClick={() => toggleRegister()}>Register</button>
        </div>
        <div>
          {loginIsDisplayed ? <Login/> : null}
          {registerIsDisplayed ? <Register/> : null}
        </div>
      </div>
    )
}; 



export default Dashboard;