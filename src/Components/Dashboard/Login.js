import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';


const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios.post('/auth/login', {username, password}).then(res => {
        console.log("this is res.data from login post axios call in Login.js", res.data)
        // props.loginUser(res.data)
        props.history.push('/lobby')
    }).catch(err => {
        console.log(err)
        alert("Login Failed. Email or password incorrect.")
    })
  };
  return(
    <div className="authContainer" >
      <input 
        name='username'
        value={username} 
        type='text'
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Type username here.' />
      <input 
        name='password'
        value={password} 
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Type password here.' />
      <button onClick={() => login()}>Submit</button>
    </div>
  )
};



export default (withRouter(Login));