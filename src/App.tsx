import AppRouter from './Routes/AppRouter'

import { AuthContext, ChatUtilitiesContext } from './context/context'
import { useReducer, useState } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'

import { defaultAuthContextState } from './reducers/authReducer'
import authReducer from './reducers/authReducer'
import { ChatUIState } from './types/types'

const queryClient = new QueryClient()

function App() {

  const [ AuthState, AuthDispatch ] = useReducer(authReducer, defaultAuthContextState )

  const [ chatContainerState, setChatContainerState ] = useState<ChatUIState>(ChatUIState.ChatList)
  const [ inChatWithUser, setInChatWithUser ] = useState<string | null>(null)

  const forChatUtilitiesContext = {chatContainerState, 
                                  setChatContainerState, 
                                  inChatWithUser, 
                                  setInChatWithUser
                                }

  return (
      <AuthContext.Provider value={{AuthState, AuthDispatch}} >
        
        <ChatUtilitiesContext.Provider value={forChatUtilitiesContext}>
        
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        
        </ChatUtilitiesContext.Provider >
      
      </AuthContext.Provider>
  )
}

export default App