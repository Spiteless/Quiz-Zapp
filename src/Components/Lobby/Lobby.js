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
              <button className="custom-game-btn"></button>
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