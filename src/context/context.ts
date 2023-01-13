import { createContext } from "react";
import { AuthContextProps, ChatUIState, IChatUtilitiesContextProps, SocketContextProps } from "../types/types";
import { defaultAuthContextState } from "../reducers/authReducer";
import { defaultSocketContextState } from "../reducers/socketReducer";

export const AuthContext = createContext<AuthContextProps>({
    AuthState: defaultAuthContextState,
    AuthDispatch: ( ) => {}
})

const defaultChatUtilities = {
    chatContainerState: ChatUIState.ChatList,
    setChatContainerState: () => {},
    inChatWithUser: null,
    setInChatWithUser: () => {}
}

export const ChatUtilitiesContext = createContext<IChatUtilitiesContextProps>(defaultChatUtilities)

export const SocketContext = createContext<SocketContextProps>({
    SocketState:defaultSocketContextState,
    SocketDispatch:()=>{}
})