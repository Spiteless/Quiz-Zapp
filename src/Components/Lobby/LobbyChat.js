import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import './Lobby.css';
// const socket = io.connect('http://localhost:4141');
//hide the port on the front end.

//Could pass socket down as prop to children.
//Or different socket connections per each need.
//Option 3: Best, but most complicated. Save socket connection in redux or context. More complicated. React Context. Create a component that wraps around your whole app (another way to use global state).
function LobbyChat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const reduxState = useSelector((reduxState) => reduxState.auth);
  console.log("reduxState", reduxState);
  //all the endpoints will go in the same useEffect. It's just setting up a listener for whatever events.

  useEffect(() => {
    if (!socket) {
      setSocket(io.connect("http://localhost:4141"));
    }
  }, []);

  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on("test2", (body) => {
        console.log(body);
      });
      socket.on("welcome", (body) => {
        console.log(body);
      });
      socket.on("message", (body) => {
        console.log(body);
        updateMessages(body);
      });
      socket.on("request-username", () => {
        console.log("reduxState", reduxState);
        if (reduxState.user && reduxState.user.user_id) {
          console.log("or this?");
          socket.emit("user-info", { ...reduxState.user });
        }
      });
      socket.on("userList", (body) => {
        console.log('users list from server', body);
        updateUsersList(body);
      });
    }
  }, [socket]);

  //Don't want anything in the dependency array, because we don't want to fire the listener another time. Need it there, empty.
  // const handleInput = (e) => {
  //     setMessage({userMessage: e.target.value})
  // }
  // const handleChange = (e) => {
  //     setJob({...job, [e.target.name]: e.target.value})
  // };
  const updateMessages = (body) => {
    console.log(body);
    setMessages((messages) => [...messages, body]);
  };

  const updateUsersList = (body) => {
    console.log('updateUsersList', body);
    setUsersList([...usersList, body]); 
  }
  const emit = () => {
    //Add user to object after message.
    socket.emit("chatter", { message });
  };

  console.log("messages", messages);

  return (
    <div className='lobby-chat-container'>
      <div className="chat-container">
        <h1 className='list-header chat-header'>Plan a game!</h1>
        <div className="upper-chat">
          <div className="messages">
            {/* {message} */}
            {messages.map((message, i) => {
              return (
                //Add user info
                <div
                  key={i}
                  className={message ? `my-message` : `other-message`}
                >
                  {message.message}
                </div>
              );
            })}
          </div>
        </div>
        <div className="input-btn-bar">
          <input
            className="chat-input"
            placeholder="type message here"
            name="userMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='chat-send-btn' onClick={() => {
              emit();
              setMessage('');
              }}>Send</button>
        </div>
      </div>
      <div className='users-list-container'>
          <h1 className='list-header'>Challenge a Player</h1>
          <div className='users-list'>
              {/* Will contain mapped over array of users from all logged-in users, from server. */}
              {/* THIS MAP NEEDS TO BE FIXED--DOESN'T DISPLAY ANYTHING YET. */}
              {usersList.map((user, ind) => {
                  return (
                      <p className='username-for-list' key={ind}>{user.username}</p>
                  )
              })}
          </div>
      </div>
      {/* <button
        onClick={() => {
          socket.emit("test", { pizza: "delicious" });
        }}
      >
        Test
      </button>

      <button
        onClick={() => {
          socket.emit("test", { dog: "lucy" });
        }}
      >
        Another button
      </button> */}

      {/* <button onClick={() =>{
                socket.emit('message', {message: "Get off my lawn!!!"} )
            }}>Third button</button> */}
    </div>
  );
}

export default LobbyChat;

//socket.on is the listening part
//socket.emit is the emitting/sending part.
