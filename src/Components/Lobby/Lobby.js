import React, {Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import './Lobby.css';
import LobbyChat from './LobbyChat';


class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "option"
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    this.setState({name: event.target.value})
    console.log(event.target.value);
  }

  render(){
  return (
    <div className="lobbyContainer" >
      <div className='left-container'>
        <div className='logo-container'></div>
        <div className='quiz-zapp'>
          <h1 className="QZ">QUIZ ZAPP</h1>
        </div>
        <div className="games-container" >
            <div className='custom-games-box'>
              <form onChange={this.onChangeValue} className="lobbyRadio">
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=114"/>
                  <label htmlFor="option1"> History </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=267"/>
                  <label htmlFor="option4"> Nature </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=574"/>
                  <label htmlFor="option3"> Literature </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=25"/>
                  <label htmlFor="option4"> Science </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=582"/>
                  <label htmlFor="option4"> U.S. Geography </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=1559"/>
                  <label htmlFor="option4"> Art & Artists </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=227"/>
                  <label htmlFor="option3"> Hodgepodge </label>
                </div>
                <Link to = {{
                  pathname: '/game',
                  state: { name: this.state.name }
                  }}>
                <button  className="custom-game-btn">Go to Game!</button>
                </Link>
              </form>
            </div>
          <div className='games-box'></div>
        </div>

        {/* <Link to='/game'>
          <button className='games-btn'>Placeholder: Link to /game</button>
        </Link> */}
      </div>
      <div className='right-container'>
        <LobbyChat/>
      </div>
    </div>
  )
};
}


export default (withRouter(Lobby));