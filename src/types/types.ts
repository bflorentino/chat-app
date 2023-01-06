import React from "react"

// TYPES AND INTERFACES FOR CONTEXT AND REDUCERS
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
    payload: AuthContextState
}

export interface AuthContextProps {
    AuthState : AuthContextState,
    AuthDispatch : React.Dispatch<ContextActions>
}

// TYPES FOR REACT EVENTS
export type InputEvent = React.FormEvent<HTMLInputElement>  | null
export type FocusEvent = React.FocusEvent<HTMLInputElement> | null


/**********************************************************************************/
// TYPES FOR HANDLING HTTP REQUESTS
export enum RequestsType { get = 'GET', post = 'POST', put = 'PUT', delete = "DELETE" }

export interface RequestObject {
    type: RequestsType,
    endpoint: string,
    body? : object,
    headers? :object,
    isFormData? : boolean
}

export interface ServerResponse {
    _status : number,
    _message : string | null,
    _data : null | object,
    _success : boolean
}

/************************************************************************************/