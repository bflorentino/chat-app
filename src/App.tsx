import AppRouter from './Routes/AppRouter'

import { AuthContext, ChatUtilitiesContext, SocketContext } from './context/context'
import { useReducer, useState } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'

import authReducer,   { defaultAuthContextState } from './reducers/authReducer'
import socketReducer, { defaultSocketContextState } from './reducers/socketReducer'

import { ChatUIState, UserChatSchema } from './types/types'

const queryClient = new QueryClient()

function App() {

  const [ AuthState,AuthDispatch ] = useReducer(authReducer, defaultAuthContextState )
  
  const [ SocketState, SocketDispatch ] = useReducer(socketReducer, defaultSocketContextState )

  const [ chatContainerState, setChatContainerState ] = useState<ChatUIState>(ChatUIState.ChatList)
  const [ inChatWithUser, setInChatWithUser ] = useState<UserChatSchema | null>(null)

  const forChatUtilitiesContext = {chatContainerState, 
                                  setChatContainerState, 
                                  inChatWithUser, 
                                  setInChatWithUser
                                }

  return (
      <AuthContext.Provider value={{AuthState, AuthDispatch}} >
          <SocketContext.Provider value={{SocketState, SocketDispatch}} >

          <ChatUtilitiesContext.Provider value={forChatUtilitiesContext}>
          
            <QueryClientProvider client={queryClient}>
              <AppRouter />
            </QueryClientProvider>
          
          </ChatUtilitiesContext.Provider >
          
        </SocketContext.Provider>
      </AuthContext.Provider>
  )
}

export default App