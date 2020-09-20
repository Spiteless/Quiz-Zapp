import React from 'react'
import { withRouter } from "react-router-dom";


const Nav = (props) => {

    const gotoLobby = () => {
        props.history.push("/lobby")
      }

    const gotoAbout = () => {
        props.history.push("/about")
      }
    
    //question refferenced below
    const gotoGames = () => {
        props.history.push("/game")
      }

    const gotoProfile = () => {
        props.history.push("/profile")
      }

    const gotoLeader = () => {
        props.history.push("/leaderboard")
      }

    //upon logout, go to dash? will need to perform the logout logic
    const gotoDash = () => {
        props.history.push("/dashboard")
      }


    return (
        <nav>
            <h3 onClick={() => {gotoLobby()}} className="navItem">Home</h3>
            <h3 onClick={() => {gotoAbout()}} className="navItem">About</h3>
            <h3 onClick={() => {gotoGames()}} className="navItem">Games</h3> {/* is this the same as lobby? or does it go to the game? */}
            <h3 onClick={() => {gotoProfile()}} className="navItem">Profile</h3>
            <h3 onClick={() => {gotoLeader()}} className="navItem">Leader</h3>
            <h3 onClick={() => {gotoDash()}} className="navItem">Logout</h3>
        </nav>
    )
}

export default withRouter(Nav);