import React from "react"
import { Socket } from "socket.io-client"

// TYPES AND INTERFACES FOR CONTEXT AND REDUCERS

/************************************************************************ */

// Socket Context
export enum SocketActionTypes {UPDATE_SOCKET ='update_socket', 
                            UPDATE_UID='update_uid', 
                            UPDATE_USERS='update_users', 
                            REMOVE_USER='remove_user'
                        }
export interface SocketContextState {
    socket: Socket | undefined,
    uid: string,
    usersOnline: string[]
}

export type SocketContextPayload = string | string[] | Socket | SocketContextState

export interface SocketContextActions {
    type:SocketActionTypes,
    payload:SocketContextPayload
}

export interface SocketContextProps {
    SocketState:SocketContextState,
    SocketDispatch: React.Dispatch<SocketContextActions> 
}

// Auth Context
export enum AuthContextActions { LOGIN = "login", LOGOUT = "logout" }

export interface AuthContextState {
    name: string,
    lastName: string,
    email: string,
    userName: string,
    token: string,
    logged?:boolean
}

export type TAuthContextPayload = AuthContextState

export interface ContextActions {
    type: AuthContextActions,
    payload?: AuthContextState
}

export interface AuthContextProps {
    AuthState : AuthContextState,
    AuthDispatch : React.Dispatch<ContextActions>
}

// Chats Context
export enum ChatsContextActionsType {
    RECEIVE_MESSAGE    = "receive_message",
    UPDATE_MESSAGE     = "update_message",
    DELETE_MESSAGE     = 'delete_message', 
    ADD_CHAT           = 'add_chat',
    DELETE_CHAT        = 'delete_chat' 
}


export interface MessageSchema {
    messageId: string,
    userFrom: string,
    content: string,
    time:string,
    wasSeen:Boolean
}

export interface ChatSchema {
    user1    :string,
    user2    :string,
    messages : MessageSchema[]
}

export type ChatContextState = { [chatId:string] : ChatSchema }

export type TChatContextPayload = ChatSchema | ChatContextState

export interface ChatsContextActions {
    type   : ChatsContextActionsType,
    payload: TChatContextPayload
}

export interface IChatContextProps {
    ChatState: ChatContextState,
    ChatDispatch: React.Dispatch<ChatsContextActions>
}

// Chat Utilities Context
export interface IChatUtilitiesContextProps {
    chatContainerState: ChatUIState,
    setChatContainerState: (s:ChatUIState) => void,
    inChatWithUser:UserChatSchema | null,
    setInChatWithUser:(s:UserChatSchema | null) => void
}

/************************************************************************ */

// TYPES FOR REACT EVENTS
export type InputEvent = React.FormEvent<HTMLInputElement>  | null
export type FocusEvent = React.FocusEvent<HTMLInputElement> | null

/************************************************************************* */

// TYPES FOR HANDLING HTTP REQUESTS
export enum RequestsType { get = 'GET', post = 'POST', put = 'PUT', delete = "DELETE" }

export enum Endpoint {
    Register      = 'authentication/register',
    login         = 'authentication/login',
    matchingUsers = 'searchUsers' 
}

export interface RequestObject {
    method: RequestsType,
    endpoint: string,
    body? : object | string| undefined,
    headers? :object | undefined,
    isFormData? : boolean
}

export interface ServerResponse {
    _status : number,
    _message : string | null,
    _data : null | object,
    _success : boolean
}

/************************************************************************************/

// TYPES FOR HANDLING CHAT
export enum ChatUIState { ChatList = "chatList", UsersSearch = "usersSearch", InChat = "inChat" }

// Users Matched
export interface UserChatSchema {
    name:string,
    last_name:string,
    user_name:string,
    lastMessage?:string,
    date?: string
}