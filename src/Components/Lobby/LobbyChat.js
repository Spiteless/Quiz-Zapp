import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import "./Lobby.css";
import { withRouter } from "react-router-dom";
import { SocketContext } from "../Context/Context";
import ScrollableFeed from 'react-scrollable-feed';
// const socket = io.connect('http://localhost:4141');
//hide the port on the front end.

//Could pass socket down as prop to children.
//Or different socket connections per each need.
//Option 3: Best, but most complicated. Save socket connection in redux or context. More complicated. React Context. Create a component that wraps around your whole app (another way to use global state).
function LobbyChat(props) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const reduxState = useSelector((reduxState) => reduxState.auth);
  const { socket, setGameParticipants, setGameRoom, setCategory } = useContext(SocketContext);

  console.log("reduxState", reduxState);
  console.log("what's on socket?", socket)
  //all the endpoints will go in the same useEffect. It's just setting up a listener for whatever events.

  useEffect(() => {
    if (socket) {
      console.log('socket in useEffect', socket);
      socket.on("test2", (body) => {});
      socket.on("welcome", (body) => {});
      socket.on("message", (body) => {
        updateMessages(body);
        console.log('message console.log', body)
      });
      // socket.on("request-username", () => {
      //   if (reduxState.user && reduxState.user.user_id) {
      //     socket.emit("user-info", { ...reduxState.user });
      //   }
      // });
      socket.on("user-list", (body) => {
        updateUsersList(body);
        // console.log('usersList in useEffect', usersList)
      });

      socket.on('start-game', (newObj) => {
        console.log("game start")
        setGameParticipants( newObj.players);
        setGameRoom(newObj.roomName);
        props.history.push('/game');
      })
    }
    return () => {
      if (socket) {
        socket.emit("remove-user", reduxState.user.username);
      }
    };
  }, [socket, props.location.pathname]);

  useEffect(()=> {
    if(socket){
      console.log('useeffect hit')
      socket.emit('join-lobby', {...reduxState.user});
    }
  }, [socket]);

//   useEffect(() => {
//     if (socket) {
//         return () => {
//               if (socket) {
//                 socket.emit("remove-user", reduxState.user.username);
//               }
//             };
//     } 
//     },[reduxState.user.username]);     
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
    socket.emit("chatter", { message, user: reduxState.user.username});
  };

  console.log("messages", messages);

  return (
    <div className="lobby-chat-container">
      <div className="chat-container">
        <h1 className="list-header chat-header">Plan a game!</h1>
        <div className='instructions'>
          <h3 className='game-instructions'>Chat with players | Select a category</h3>
          {/* <h3 className='game-instructions'>➀ Chat with players </h3> */}
          {/* <h3 className='game-instructions'>➁ Select a category</h3> */}
          {/* <h3 className='game-instructions'>➁ Select a category</h3> */}
          <h3 className='game-instructions bigger'>Then, click on a player to start game!</h3>
          {/* <h3 className='game-instructions bigger'>➂ Click on player to start game</h3> */}
        </div>
    
        <div className="upper-chat scrollable-wrapper">
          <div className="messages">
      <ScrollableFeed>
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
            placeholder="Type message here..."
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
          {usersList.map((user, ind) => {
            return (
              <p onClick={() => {
                console.log('~~~~ clicked')
                socket.emit('challenge-player', {challenger: reduxState.user.user_id, opponent: user.user_id });
                  //Do we need to include the input id or value? 
                // setCategory(props.name);
              }} className="username-for-list" key={ind}>
                {user.username}
              </p>
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

export default withRouter(LobbyChat);

//socket.on is the listening part
//socket.emit is the emitting/sending part.
