import AppRouter from './Routes/AppRouter'

import { AuthContext } from './context/context'
import { useReducer } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'

import { defaultAuthContextState } from './reducers/authReducer'
import authReducer from './reducers/authReducer'

const queryClient = new QueryClient()

function App() {

  const [ AuthState, AuthDispatch ] = useReducer(authReducer, defaultAuthContextState )

  return (
      <AuthContext.Provider value={{AuthState, AuthDispatch}} >
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </AuthContext.Provider>
  )
}

export default App