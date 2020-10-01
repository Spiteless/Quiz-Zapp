import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import "./Lobby.css";
import { SocketContext } from "../Context/Context";
import ScrollableFeed from 'react-scrollable-feed'
// const socket = io.connect('http://localhost:4141');
//hide the port on the front end.

//Could pass socket down as prop to children.
//Or different socket connections per each need.
//Option 3: Best, but most complicated. Save socket connection in redux or context. More complicated. React Context. Create a component that wraps around your whole app (another way to use global state).
function LobbyChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const reduxState = useSelector((reduxState) => reduxState.auth);
  const { socket } = useContext(SocketContext);
  console.log("reduxState", reduxState);
  //all the endpoints will go in the same useEffect. It's just setting up a listener for whatever events.

  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on("test2", (body) => {});
      socket.on("welcome", (body) => {});
      socket.on("message", (body) => {
        updateMessages(body);
      });
      socket.on("request-username", () => {
        if (reduxState.user && reduxState.user.user_id) {
          socket.emit("user-info", { ...reduxState.user });
        }
      });
      socket.on("userList", (body) => {
        updateUsersList(body);
      });
    }
    return () => {
      if (socket) {
        socket.emit("remove-user", reduxState.user.username);
      }
    };
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
    setUsersList(usersList.concat(body));
    console.log("updateUsersList", body);
  };
  const emit = () => {
    //Add user to object after message.
    socket.emit("chatter", { message, user: reduxState.user.username });
  };

  console.log("messages", messages);

  return (
    <div className="lobby-chat-container">
      <div className="chat-container">
        <h1 className="list-header chat-header">Plan a game!</h1>
      
        <div className="upper-chat scrollable-wrapper">
          <div className="messages">
      <ScrollableFeed>
            {/* {message} */}
            {messages.map((message, i) => {
              return (
                //Add user info
                <div
                  // message={message}
                  //this isn't working. trying to get user on message.
                  // user={reduxState.user.username}
                  key={i}
                  className={
                    messages[i].user === reduxState.user.username
                      ? `my-message`
                      : `other-message`
                  }
                >
                  {console.log(
                    "trying to get user on the message",
                    message.user
                  )}

                  <div className="message-container">
                    {/* <h1 className='user-tag'>
                      {messages[i].user}: <p className='user-message'>  {message.message}</p>
                    </h1> */}
                    <h1 className="user-tag">
                      {messages[i].user === reduxState.user.username
                        ? null
                        : messages[i].user + `: `}
                      <p className="user-message"> {message.message}</p>
                    </h1>
                  </div>
                  {/* <p>{message.message}</p> */}

                  {/* {reduxState.user.username + ' : ' + message.message} */}
                </div>
              );
            })}
      </ScrollableFeed>
          </div>
        </div>

        <form className="input-btn-bar">
          <input
            className="chat-input"
            placeholder="type message here"
            name="userMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="chat-send-btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              emit();
              setMessage("");
            }}
          >
            Send
          </button>
        </form>
      </div>
      <div className="users-list-container">
        <h1 className="list-header">Challenge a Player</h1>
        <div className="users-list">
          {/* THIS MAP NEEDS TO BE FIXED--DISPLAYS SORT OF. Each username needs to be a link/button or something that when you click on it, it will display a pop up to challenge the user...?*/}
          {usersList.map((user, ind) => {
            return (
              <p onClick={() => {}} className="username-for-list" key={ind}>
                {user.username}
              </p>
              //   return (
              // <div className='username-for-list' key={ind}>{user[ind].username}</div>
            );
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
