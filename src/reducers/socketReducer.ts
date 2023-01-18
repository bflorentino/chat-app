import { SocketActionTypes, SocketContextState, SocketContextActions } from "../types/types"
import { Socket } from "socket.io-client"

export const defaultSocketContextState:SocketContextState = {
    socket:undefined,
    uid:"",
    usersOnline:{}
}

export const socketReducer = (state:SocketContextState, action:SocketContextActions) => {

    switch(action.type){
        case SocketActionTypes.UPDATE_SOCKET:
            return {...state, socket:action.payload as Socket }
        
        case SocketActionTypes.UPDATE_UID:
            return {...state, uid:action.payload as string}
    
        case SocketActionTypes.UPDATE_USERS:
            return {...state, usersOnline:action.payload as {[key:string]:string} }

        case SocketActionTypes.REMOVE_USER:
            delete state.usersOnline[action.payload as string]
            return {...state }

        default:
            return state
    }
}

export default socketReducer