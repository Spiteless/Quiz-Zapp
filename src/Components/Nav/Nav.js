import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {getUser, logoutUser} from '../../redux/authReducer';
// import '../../css/Nav.css'
import './Nav.css';


const Nav = (props) => {
    const [update, setUpdate] = useState(false);
    console.log("comes from redux props", props);
    useEffect(() => {
        props.getUser();
        console.log('props.history', props.history);
        // if(!props.user.loading) {
        //     if(props.user.username === ''){
        //         props.history.push('/');
        //     }
        // }
    }, [props.user.username, props.location.pathname]);
    // [props.user.username, props.location.pathname]

    useEffect(() => {
        console.log('props.user NAV', props.user)
        console.log('hit update', update)
        setUpdate(() => !update);
    }, [props.user.username]);

    const logout = () => {
        axios.post('/auth/logout').then(res => {
            props.logoutUser();
            props.history.push('/')
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
            {/* {props.user.auth && <h1>{props.user.username}</h1> } */}
        </nav>
    )
}


// const mapStateToProps = (reduxState) => {
//     console.log('reduxState on NAV', reduxState)
//     return reduxState
// }

function mapStateToProps(reduxState){
    console.log("REDUX STATE Nav", reduxState)
    return {
        user: reduxState
    };
}

export default connect(mapStateToProps, {getUser, logoutUser})(withRouter(Nav));


