import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
// import '../App.css';

const LeaderBoard = (props) => {
    let [gameLeaders, setGameLeaders] = useState([]);

    const getLeaders = () => {
        Axios.get('/api/leaders').then((leaders) => setGameLeaders(leaders.data))}
    console.log('xyzzy leaders', gameLeaders)

    useEffect(() => getLeaders(),[])

    return(
      <div className="leaderboardContainer" >
        <h1> Leader Board </h1>
        {gameLeaders.map(data => {
            return(<h2>{data.username} {data.score} {data.questions} {data.correct}</h2>)
        })}
      </div>
    )
};



export default (withRouter(LeaderBoard));