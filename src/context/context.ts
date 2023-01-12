import { createContext } from "react";
import { AuthContextProps, ChatUIState, IChatUtilitiesContextProps } from "../types/types";
import { defaultAuthContextState } from "../reducers/authReducer";

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