import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import ToolsList from './components/ToolsList.jsx'
import PreviousIssues from './components/PreviousIssues.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/tools' element={<ToolsList />} />
        <Route path='/issues' element={<PreviousIssues />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
