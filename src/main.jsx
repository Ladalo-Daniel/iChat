import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ChatsContextProvider } from './context/ChatsContext.jsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './context/Theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </ChatsContextProvider>
  </AuthContextProvider>
)
