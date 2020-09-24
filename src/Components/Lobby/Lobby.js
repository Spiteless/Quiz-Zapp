import React from 'react';
import { withRouter, Link } from "react-router-dom";
import './Lobby.css';


const Lobby = (props) => {

  return (
    <div className="lobbyContainer" >
      <div className='left-container'>
        <div className='logo-container'></div>
        <div className="games-container" >
            <div className='custom-games-box'>
              <form className="lobbyRadio">
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="option1"/>
                  <label for="option1"> option 1 </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="option2"/>
                  <label for="option2"> option 2 </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="option3"/>
                  <label for="option3"> option 3 </label>
                </div>
                <div className="radioOption">
                  <input className="radio" type="radio" name="options" value="option4"/>
                  <label for="option4"> option 4 </label>
                </div>
              </form>
              <button className="custom-game-btn">Custom Game</button>
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



export default (withRouter(Lobby));