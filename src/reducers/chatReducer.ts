import { ArrivingMessage, ArrivingReadMessages, ChatContextState, ChatSchema, ChatsContextActions, ChatsContextActionsType } from "../types/types";

export const chatsReducer = (state:ChatContextState={}, action:ChatsContextActions):ChatContextState =>{

    let payload: ChatSchema | ArrivingMessage |  ArrivingReadMessages
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

        case ChatsContextActionsType.DELETE_MESSAGE:

            payload = action.payload as ArrivingMessage
            chatId = payload.chatId
            let messagetoDelete = payload.message

            return {...state,  
                [chatId] : {...state[chatId],
                           messages: state[chatId].messages.filter(msg => msg.messageId !==  messagetoDelete.messageId)
                       }, 
               } as ChatContextState

        case ChatsContextActionsType.MESSAGES_READ:
            
            payload = action.payload as ArrivingReadMessages
            chatId = payload.chatId
            const messagesId = payload.messagesId

            return {...state,
                [chatId]:{...state[chatId],
                         messages: state[chatId].messages.map(msg => messagesId[msg.messageId] ? {...msg, was_seen:true} : msg)
                    }
                } as ChatContextState

        case ChatsContextActionsType.REMOVE_CHATS:
            return {}
                
        default:
            return state
    }
}