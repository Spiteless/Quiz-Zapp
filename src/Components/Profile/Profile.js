import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";
import { SocketContext } from '../Context/Context';
import { useSelector } from "react-redux";
import "./profile.css"
// import '../App.css';
// import axios from 'axios';

const Profile = (props) => {
  const reduxState = useSelector((reduxState) => reduxState.auth);

  const context = useContext(SocketContext)
  console.log("profile context", context)
  console.log('profile props', props)
    return(
      <div className="profileContainer">
        <div className="profile">
          <div className="userProfile"><h1 className="profileName">{reduxState.user.username}</h1></div>
          <div className="userScores">
            
            <h3 className="scoresText">{reduxState.user.username}'s current score: <span className="score">{reduxState.user.score}</span></h3>
            <h3 className="scoresText">The number of questions that {reduxState.user.username} has guessed at is: <span className="score">{reduxState.user.questions}</span></h3>
            <h3 className="scoresText">The number of questions that {reduxState.user.username} has guessed correctly is: <span className="score">{reduxState.user.correct}</span> </h3>
          
          </div>
        </div>
      </div>
    )
};



export default (withRouter(Profile));