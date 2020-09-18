import React from 'react';
import './App.css';
import {Switch, Router} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import About from './Components/About/About';
import Dashboard from './Components/Dashboard/Dashboard';
import Game from './Components/Game/Game';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Lobby from './Components/Lobby/Lobby';
import WaitingRoom from './Components/WaitingRoom/WaitingRoom';
import Profile from './Components/Profile/Profile';

import Nav from './Components/Nav/Nav';


function App() {
  return (
    <div className="App">
      {props.location.pathname !== '/' ?
        <Nav/>
      }

    </div>
  );
}

export default App;
