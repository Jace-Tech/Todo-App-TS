import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TodoContextProvider from './context/TodoContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
)
