import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import About from './Components/About/About';
import Dashboard from './Components/Dashboard/Dashboard';
import Game from './Components/Game/Game';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Lobby from './Components/Lobby/Lobby';
import WaitingRoom from './Components/WaitingRoom/WaitingRoom';
import Profile from './Components/Profile/Profile';
import GameStats from './Components/Game/GameStats';

import Nav from './Components/Nav/Nav';



function App(props) {
  return (
    <div className="App">
      {(props.location.pathname !== '/' )
        ? <div className="navContainer"><Nav/></div> 
        : null
        }

       <Switch>
         <Route exact path = '/' component={Dashboard} />
         <Route path = '/game' component={Game} />
         <Route path = '/lobby' component={Lobby} />
         <Route path = '/game/:gameId/stats' component={GameStats} />
         <Route path = '/profile/:userId' component={Profile} />  {/*USER ID NEEDED?*/}
         <Route path = '/waitingRoom' component={WaitingRoom} />
         <Route path = '/leaderBoard' component={Leaderboard} />
         <Route path = '/about' component={About} />
         
       </Switch>

    </div>
  );
}

export default withRouter(App);
