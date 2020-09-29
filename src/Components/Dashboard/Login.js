import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/authReducer';


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/auth/login', {username, password}).then(res => {
        console.log("this is res.data from login post axios call in Login.js", res.data)
        props.loginUser(res.data)
        props.history.push('/lobby')
    }).catch(err => {
        console.log(err)
        alert("Login Failed. Email or password incorrect.")
    })
  };
  return(
    <form className="authContainer" >
      <input className="user-pass"
        name='username'
        value={username} 
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Type username here.' />
      <input className="user-pass"
        name='password'
        value={password} 
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Type password here.' />
      <button className="user-pass-submit"
      type=""
      method='post'
      onClick={(e) => {
        e.preventDefault();
        login()
        return false}}>Submit</button>
    </form>
  )
};



export default connect(null, {loginUser})(withRouter(Login));