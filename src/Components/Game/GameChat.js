import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4141');
//hide the port on the front end.

//Option 1: Could pass socket down as prop to children.
//Option 2: Or different socket connections per each need.
//Option 3: Best, but most complicated. Save socket connection in redux or context. More complicated. React Context. Create a component that wraps around your whole app (another way to use global state).
function GameChat(){
    const [socket, setSocket] = useState(null);
    //all the endpoints will go in the same useEffect. It's just setting up a listener for whatever events.
    
    useEffect(() => {
        if(!socket){
            setSocket(io.connect('http://localhost:4141'));
        }
    }, []);

    useEffect(() => {
        if(socket){
            socket.on('test2', (body) => {
                console.log(body);
            });
            socket.on('welcome', (body) => {
                console.log(body)
            });
        }
    }, [socket])
//Passing socket in the dependency array. So anytime socket (on local state) is updated, the useEffect will re-render.
  
    return(
        <form>
            <button onClick={()=>{
                socket.emit('test', {pizza: 'delicious'})
            }}>Test</button>
            <button type="submit" onClick={(e) =>{
                e.preventDefault();socket.emit('test', {dog: "lucy"} )
            }}>Another button</button>
        </form>
    )
}

export default GameChat;

//socket.on is the listening part
//socket.emit is the emitting/sending part.