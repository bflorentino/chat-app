import { useContext, useEffect } from "react";
import { useSocket } from "./useSocket";
import { SOCKET_URL } from "../constants";
import { AuthContext, ChatContext, ChatUtilitiesContext, SocketContext } from "../context/context";
import { ChatSchema, ChatsContextActionsType, ArrivingMessage, SocketActionTypes, SocketEvents } from "../types/types";
import messageSound from '../assets/sounds/Message Notification.mp3'

// HOOK TO MANAGE ALL MESSAGES RECEIVED FROM SOCKETS    
export const useSocketListener = () => {

    const { SocketDispatch } = useContext(SocketContext)
    const { ChatDispatch } = useContext(ChatContext)
    const { AuthState:{userName}} = useContext(AuthContext)
    const { setInChatWithUser} = useContext(ChatUtilitiesContext)
    
    const notification = new Audio(messageSound)

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

        socket.on(SocketEvents.userDisconnected, (user:string) => {
          SocketDispatch({type:SocketActionTypes.REMOVE_USER, payload:user})
        })

    }, [])

    useEffect(()=>{
          // LISTENERS TO MANAGE CHATS AND MESSAGES
          socket.on(SocketEvents.messageReceived, (messageChat:ChatSchema | ArrivingMessage) => {
            
            if("_id" in messageChat){
              
              ChatDispatch({type:ChatsContextActionsType.ADD_CHAT, payload:messageChat})         
              
              setInChatWithUser((userChat) => { 
                  if(userChat.user_name === messageChat.user_1 || userChat.user_name === messageChat.user_2){
                    return {...userChat, _id:messageChat._id}
                  }
                  return {...userChat}
                })

              // Just play sound if the user starting the chat is not the same as the user connected
              if(messageChat.user_2 === userName){
                notification.play().catch((e)=> console.log("Can't play without user interaction"))
              }
              return 
            }
            
              ChatDispatch({type:ChatsContextActionsType.RECEIVE_MESSAGE, payload:messageChat})
              
              // Just play sound if the user sending the message is not the same as the user connected
              if(messageChat.message.user_from !== userName){
                notification.play().catch((e)=> console.log("Can't play without user interaction"))
              }
        })

        socket.on(SocketEvents.messagedUpdated, (message:ArrivingMessage) => {
          ChatDispatch({type:ChatsContextActionsType.UPDATE_MESSAGE, payload:message})
        })

        socket.on(SocketEvents.messageDeleted, (message:ArrivingMessage) => {
          ChatDispatch({type:ChatsContextActionsType.DELETE_MESSAGE, payload:message})
        })

        socket.on(SocketEvents.messageRead, (messagesRead:{messagesId:{[m:string]:string}, chatId:string}) => {
          ChatDispatch({type:ChatsContextActionsType.MESSAGES_READ, payload:messagesRead})
        })

    },[])
}