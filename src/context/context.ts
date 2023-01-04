import { createContext } from "react";
import { AuthContextProps } from "../types/types";
import { defaultAuthContextState } from "../reducers/authReducer";

export const AuthContext = createContext<AuthContextProps>({
    AuthState: defaultAuthContextState,
    AuthDispatch: ( ) => {}
})


