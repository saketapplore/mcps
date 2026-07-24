import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import AuthProvider from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
  <AuthProvider>
  <ThemeProvider>
  <BrowserRouter>
  <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
    </StrictMode>
)
