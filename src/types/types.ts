import React from "react"

// TYPES AND INTERFACES FOR CONTEXT AND REDUCERS
export enum AuthContextActions { LOGIN = "login", LOGOUT = "logout" }

export interface AuthContextState {
    name: string,
    lastName: string,
    email: string,
    userName: string,
    token: string,
    logged:boolean
}

export type TAuthContextPayload = AuthContextState

export interface ContextActions {
    type: AuthContextActions,
    payload: AuthContextState
}

export interface AuthContextProps {
    AuthState : AuthContextState,
    AuthDispatch : React.Dispatch<ContextActions>
}


// TYPES FOR REACT EVENTS
export type FormEvent = React.FormEvent<HTMLFormElement>