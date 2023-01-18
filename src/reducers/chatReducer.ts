import { ArrivingMessage, ChatContextState, ChatSchema, ChatsContextActions, ChatsContextActionsType } from "../types/types";

export const chatsReducer = (state:ChatContextState={}, action:ChatsContextActions):ChatContextState =>{

    let payload: ChatSchema | ArrivingMessage

    switch(action.type){
    
        case ChatsContextActionsType.GET_CHATS:
            
            return {...action.payload as ChatContextState}

        case ChatsContextActionsType.RECEIVE_MESSAGE:

            payload = <ArrivingMessage>action.payload
            const chatId = payload.chatId as string              
            
            return {...state, [chatId] : {...state[chatId], 
                        messages:[...state[chatId].messages, payload.message ] 
                    }
                } as ChatContextState
            
        case ChatsContextActionsType.ADD_CHAT:

            payload = <ChatSchema>action.payload
            return {...state, [payload._id]:payload } as ChatContextState

        default:
            return state
        }
}