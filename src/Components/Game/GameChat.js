import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4141');
//hide the port on the front end.

//Could pass socket down as prop to children.
//Or different socket connections per each need.
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
//Don't want anything in the dependency array, because we don't want to fire the listener another time. Need it there, empty.
  
    return(
        <div>
            <button onClick={()=>{
                socket.emit('test', {pizza: 'delicious'})
            }}>Test</button>
            <button onClick={() =>{
                socket.emit('test', {dog: "lucy"} )
            }}>Another button</button>
        </div>
    )
}

export default GameChat;

//socket.on is the listening part
//socket.emit is the emitting/sending part.