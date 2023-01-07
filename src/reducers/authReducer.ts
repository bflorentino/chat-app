import { AuthContextActions, 
        ContextActions, 
        AuthContextState 
    } from "../types/types";

export const defaultAuthContextState : AuthContextState = {
    logged:false,
    name:"",
    lastName:"",
    token:"",
    userName:"",
    email:""
} 

const authReducer = (state:AuthContextState, action:ContextActions):AuthContextState => {

    switch(action.type){
        case AuthContextActions.LOGIN:
            return {...action.payload!, logged:true}

        case AuthContextActions.LOGOUT:
            return {...defaultAuthContextState}

        default:
            return state
    }
}

export default authReducer