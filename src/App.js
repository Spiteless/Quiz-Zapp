import React from 'react';
import './App.css';
import './reset.css';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import About from './Components/About/About';
import Dashboard from './Components/Dashboard/Dashboard';
import Game from './Components/Game/Game';
import GameAnon from './Components/Game/GameAnon';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import Lobby from './Components/Lobby/Lobby';
import WaitingRoom from './Components/WaitingRoom/WaitingRoom';
import Profile from './Components/Profile/Profile';
import GameStats from './Components/Game/GameStats';
import Nav from './Components/Nav/Nav';

function App(props) {
  const showNav = () => {
    if(props.location.pathname !== '/' && props.location.pathname !== '/game' && props.location.pathname !== '/game/anon') {
      return <Nav/>
    } else {
      return null
    }
  }

  return (
    <div className="App">
      <div>
        {showNav()}
      </div>
      {/* <Nav/> */}
      <Switch>
        <Route exact path = '/' component={Dashboard} />
        <Route exact path = '/game' component={Game} />
        <Route path = '/lobby' component={Lobby} />
        <Route path = '/game/:gameId/stats' component={GameStats} />
        <Route path = '/game/anon' component={GameAnon} />
        <Route path = '/profile/:userId' component={Profile} />  {/*USER ID NEEDED?*/}
        <Route path = '/waitingroom' component={WaitingRoom} />
        <Route path = '/leaderboard' component={Leaderboard} />
        <Route path = '/about' component={About} />
         
       </Switch>

    </div>
  );
}

export default withRouter(App);
