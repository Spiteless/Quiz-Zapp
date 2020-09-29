import React, { useState, createContext } from "react"; 
import io from "socket.io-client";
export const SocketContext = createContext(
 null
); 
export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const connectSocket = () =>{
        setSocket((s) => {
           return !s ? io.connect("http://localhost:4141") : s
        })
    }
    return(
        <SocketContext.Provider value={{socket, setSocket, connectSocket}}>
            {children}
        </SocketContext.Provider>
    )
}