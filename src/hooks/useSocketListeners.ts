import { useContext, useEffect } from "react";
import { useSocket } from "./useSocket";
import { SOCKET_URL } from "../constants";
import { AuthContext, ChatContext, ChatUtilitiesContext, SocketContext } from "../context/context";
import { ChatSchema, ChatsContextActionsType, ArrivingMessage, SocketActionTypes, SocketEvents, UserChatSchema } from "../types/types";

// HOOK TO MANAGE ALL MESSAGES RECEIVED FROM SOCKETS    
export const useSocketListener = async () => {

    const { SocketDispatch } = useContext(SocketContext)
    const { ChatDispatch } = useContext(ChatContext)
    const { AuthState:{userName}} = useContext(AuthContext)

    const { setInChatWithUser, inChatWithUser } = useContext(ChatUtilitiesContext)

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
    }, [])

    useEffect(()=>{
        // LISTENERS TO MANAGE CHATS AND MESSAGES
        socket.on(SocketEvents.messageReceived, (message:ChatSchema | ArrivingMessage) => {

          if("_id" in message){
            ChatDispatch({type:ChatsContextActionsType.ADD_CHAT, payload:message})
              if(inChatWithUser.user_name && (inChatWithUser.user_name === message.user_1 || inChatWithUser.user_name === message.user_2)){
                setInChatWithUser((userChat) => ({...userChat, _id:message._id}))
              }
            }
          else{
            ChatDispatch({type:ChatsContextActionsType.RECEIVE_MESSAGE, payload:message})
          }
        })
    }, [inChatWithUser])
}