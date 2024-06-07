import React from 'react'
import AppRouter from './routers/AppRouter.js'
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";

const App = () => (
  <GlobalProvider>
    <AuthProvider >
      <AppRouter />
    </AuthProvider>
  </GlobalProvider>
)

export default App
