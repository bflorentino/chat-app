import { ChatContextState, ChatsContextActions, ChatsContextActionsType } from "../types/types";

export const chatsReducer = (state:ChatContextState={}, action:ChatsContextActions):ChatContextState =>{

    switch(action.type){
    
        case ChatsContextActionsType.GET_CHATS:
            return {...action.payload as ChatContextState}

        case ChatsContextActionsType.RECEIVE_MESSAGE:

            const chatId = action.payload.chatId as string

            return {...state, [chatId] : {...state[chatId], 
                                messages:[...state[chatId].messages, action.payload.message ] 
                            }
                    } as ChatContextState
        
        default:
            return state
        }
}