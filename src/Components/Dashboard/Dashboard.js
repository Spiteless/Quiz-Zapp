import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Login from './Login';
import Register from './Register';
// import './Dashboard.scss';
// import '../../css/Dashboard.css';
import './Dashboard.css';
// import logo from '../../../src/quizzapp.png';
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
        <div className='grayBar'>
          <div className='logo-container-dash'>
            <div className="dash-logo"></div>
            {/* import logo, and fix the position over the gray bar */}
          </div>
        </div>
        <h1 className='game-title'> Quiz Zapp </h1>
        <div className='buttonBar'>
          <Link to='/game/anon'>
            <button className="dash-btn" >Quick Start</button>
          </Link>
          <button className="dash-btn" onClick={() => toggleLogin()}>Login</button>
          <button className="dash-btn" onClick={() => toggleRegister()}>Register</button>
        </div>
        <div className="dash-auth-container">
          {loginIsDisplayed ? <Login/> : null}
          {registerIsDisplayed ? <Register/> : null}
        </div>
      </div>
    )
}; 



export default Dashboard;