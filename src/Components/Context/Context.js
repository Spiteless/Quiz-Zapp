// import { set } from "lodash";
import React, { useState, createContext } from "react"; 
import io from "socket.io-client";
export const SocketContext = createContext(
 null
); 
export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [gameRoom, setGameRoom] = useState('');
    const [category, setCategory] = useState('');
    const [gameParticipants, setGameParticipants] = useState([
        {
            correct: 0,
            email: "Morgan@gocart.mart",
            questions: 0,
            score: 0,
            socketId: "A2jd5xDbxWGtygnlAAAA",
            user_id: 101,
            username: "Morganizer"
          },
          {
            correct: 0,
            email: "T@Rizzle.com",
            questions: 0,
            score: 0,
            socketId: "UBNG890351ijAOING2Pp",
            user_id: 100,
            username: "T-Rizzle"
          }
    ]);

    const saveCategory = (qURL) => {
        setCategory(qURL);
    }
    console.log('category in context', category)

    const getGameParticipants = () => gameParticipants

    const saveGameRoom = (room) => {
        setGameRoom(setGameRoom(room))
        console.log('gameRoom')     
    }

    const currentGameRoom = () => gameRoom

    const connectSocket = () =>{
        setSocket((s) => {
           return !s ? io.connect("http://localhost:4141") : s
        })
    }
    return(
        <SocketContext.Provider value={{
            socket,
            setSocket,
            connectSocket,
            gameParticipants,
            getGameParticipants,
            setGameParticipants,
            gameRoom,
            setGameRoom,
            category,
            setCategory,
            saveCategory

            }}>
            {children}
        </SocketContext.Provider>
    )
}