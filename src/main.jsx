import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import { AuthProvider } from './authContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import ProjectRoutes from './Router.jsx'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(


  <AuthProvider>

    <Router>
      {/* <App /> */}

      <ProjectRoutes />
      <ToastContainer />
      
    </Router>
  </AuthProvider>
)
