import React from 'react';
import { withRouter, Link } from "react-router-dom";
import './Lobby.css';


const Lobby = (props) => {



  return (
    <div className="lobbyContainer" >
      <div className='left-container'>
        <p> Lobby (delete this when built)</p>
        <div className='logo-container'></div>
        <div className='games-box'></div>
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