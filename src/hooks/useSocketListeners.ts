import { useContext, useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import { SOCKET_URL } from "../constants";
import { AuthContext, SocketContext } from "../context/context";
import { SocketActionTypes, SocketEvents } from "../types/types";

// HOOK TO MANAGE ALL MESSAGES RECEIVED FROM SOCKETS    
export const useSocketListener = async () => {

    const { SocketDispatch } = useContext(SocketContext)
    const { AuthState:{userName}} = useContext(AuthContext)

    const socket = useSocket(SOCKET_URL, {
        reconnectionAttempts:5,
        reconnectionDelay:1000,
        autoConnect:false
      })

    useEffect(()=> {

        socket.connect()
        SocketDispatch({type:SocketActionTypes.UPDATE_SOCKET, payload:socket})

        socket.emit(SocketEvents.userConnected, userName)

        // INITIALIZING CONNECTION LISTENER
        socket.on(SocketEvents.userConnected, (users:{[key:string]:string}) => {
          SocketDispatch({type:SocketActionTypes.UPDATE_USERS, payload:users})
        })

        // LISTENERS TO MANAGE CHATS AND MESSAGES
        socket.on(SocketEvents.messageReceived, message => {
            console.log(message)
        })

    }, [])
}