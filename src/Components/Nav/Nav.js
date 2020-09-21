import React from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import '../../css/Nav.css'


const Nav = (props) => {

    //getUser won't work until we get redux up and running.
    // useEffect(() => {
    //     // console.log("comes from redux props", props);
    //     // props.getUser();
    //     console.log('props.history', props.history);
    //     if(props.user.username === ''){
    //         props.history.push('/');
    //     }
    // }, [props.user.email, props.location.pathname]);

    const logout = () => {
        axios.post('/auth/logout').then(res => {
            // props.logoutUser();
            // props.history.push('/')
        }).catch(err => console.log(err))
    }

    return (
        <nav className='nav'>
            <Link to='/'>
                <h3 className="navItem">Home</h3>
            </Link>
            <Link to='/about'>
                <h3 className="navItem">About</h3>
            </Link>
            <Link to='/lobby'>
                <h3 className="navItem">Games</h3> 
            </Link>
            <Link to='/profile'>
                <h3 className="navItem">Profile</h3>
            </Link>
            <Link to='/leaderboard'>
                <h3 className="navItem">Leader</h3>
            </Link>
            <Link to='/'>
                <h3 className="navItem" onClick={() => logout()}>Logout</h3>
            </Link>
        </nav>
    )
}

export default withRouter(Nav);