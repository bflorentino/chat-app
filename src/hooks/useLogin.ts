import { useContext } from "react"
import { AuthContext } from "../context/context"
import { AuthContextActions, AuthContextState } from "../types/types"

export const useLogin = ()  => {

    const { AuthDispatch } = useContext(AuthContext)

    const setLogged = (authData:AuthContextState) => {

       AuthDispatch({
            type: AuthContextActions.LOGIN, 
            payload: {...authData}
        })
        window.localStorage.setItem("userToken", JSON.stringify({...authData}))
    }

    return setLogged
}