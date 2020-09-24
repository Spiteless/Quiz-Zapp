import React, {Component} from 'react';
import { withRouter, Link } from "react-router-dom";
import './Lobby.css';


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
        <div className="games-container" >
            <div className='custom-games-box'>
              <form onChange={this.onChangeValue} className="lobbyRadio">
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=114"/>
                  <label for="option1"> History </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=422"/>
                  <label for="option2"> People </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=49"/>
                  <label for="option3"> Food </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="http://jservice.io/api/clues?category=267"/>
                  <label for="option4"> Nature </label>
                </div>
                <Link to = {{
                  pathname: '/game',
                  state: { name: this.state.name }
                  }}>
                <button  className="custom-game-btn">Custom Game</button>
                </Link>
              </form>
            </div>
          <div className='games-box'></div>
        </div>

        <Link to='/game'>
          <button className='games-btn'>Placeholder: Link to /game</button>
        </Link>
      </div>
      <div className='right-container'>
        <div className='chat-container'>
          <div className='upper-chat'></div>
          <div className='input-btn-bar'>
            <input className='chat-input'/>
            <button className='chat-send-btn'>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
};
}


export default (withRouter(Lobby));