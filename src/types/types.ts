import React from "react"

// TYPES AND INTERFACES FOR CONTEXT AND REDUCERS

/************************************************************************ */

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
    inChatWithUser:string | null,
    setInChatWithUser:(s:string | null) => void
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

export interface ChatListSchema {
    name: string,
    lastName:string,
    userName:string,
    lastMessage?:string,
    date?: string
}

// Users Matched
export interface UserMatch {
    name:string,
    last_name:string,
    user_name:string,
}