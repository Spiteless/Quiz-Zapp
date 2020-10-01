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
          <hr></hr>
          <h1 className="QZ">QUIZ ZAPP</h1>
          <hr></hr>
        </div>
        <div className="games-container" >
            <div className='custom-games-box'>
              <form onChange={this.onChangeValue} className="lobbyRadio">
                <div className="radioOption">
                  <input id="option1" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=114"/>
                  <label for="option1"> History </label>
                </div>
                <div className="radioOption">
                  <input id="option2" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=267"/>
                  <label for="option2"> Nature </label>
                </div>
                <div className="radioOption">
                  <input id="option3" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=574"/>
                  <label for="option3"> Literature </label>
                </div>
                <div className="radioOption">
                  <input id="option4" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=25"/>
                  <label for="option4"> Science </label>
                </div>
                <div className="radioOption">
                  <input id="option5" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=582"/>
                  <label for="option5"> U.S. Geography </label>
                </div>
                <div className="radioOption">
                  <input id="option6" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=1559"/>
                  <label for="option6"> Art & Artists </label>
                </div>
                <div className="radioOption">
                  <input id="option7" className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=227"/>
                  <label for="option7"> Hodgepodge </label>
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