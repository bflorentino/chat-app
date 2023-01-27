import { ArrivingMessage, ChatContextState, ChatSchema, ChatsContextActions, ChatsContextActionsType } from "../types/types";

export const chatsReducer = (state:ChatContextState={}, action:ChatsContextActions):ChatContextState =>{

    let payload: ChatSchema | ArrivingMessage
    let chatId: string

    switch(action.type){
    
        case ChatsContextActionsType.GET_CHATS:
    
            return {...action.payload } as ChatContextState
        
        case ChatsContextActionsType.ADD_CHAT:

            payload = <ChatSchema>action.payload
            return {...state, [payload._id]:payload } as ChatContextState

        case ChatsContextActionsType.RECEIVE_MESSAGE:

            payload = <ArrivingMessage>action.payload
            chatId = payload.chatId              
            
           return {...state,  
                     [chatId] : {...state[chatId],
                            messages:[...state[chatId].messages, payload.message ]
                        }, 
                    } as ChatContextState

        case ChatsContextActionsType.UPDATE_MESSAGE:
            
            payload = action.payload as ArrivingMessage
            chatId = payload.chatId
            let messagetoUpdate = payload.message
            
           return {...state,  
                     [chatId] : {...state[chatId],
                                messages: state[chatId].messages.map(msg => msg.messageId ===  messagetoUpdate.messageId 
                                                                                            ? {...msg, ...messagetoUpdate} 
                                                                                            : msg  
                                                                                        )
                            }, 
                    } as ChatContextState

        default:
            return state
    }
}