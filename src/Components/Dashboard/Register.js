import React, {useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const register = () => {
    if(username && password && email){
        axios.post('/auth/register', {username, password, email}).then(res => {
        //    props.loginUser(res.data)
           props.history.push('/lobby') 
        }).catch(err => {
            console.log(err)
            alert("Registration failed. Try another email address.")
        })
    } else {
        alert("Registration failed. All fields must have a value.")
    }
}
  return(
    <form className="authContainer" >
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
      <input 
        name='email'
        value={email} 
        type='text'
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Type email here.' />
      <button type="submit" onClick={(e) => {
        e.stopPropagation();
        register()}}>Submit</button>
    </form>
  )
};



export default withRouter(Register);