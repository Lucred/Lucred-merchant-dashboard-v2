import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import {Provider} from  "react-redux"
import { ToastContainer } from 'react-toastify'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import { ProtectRoute } from './pages/ProtectedRoute'

const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

function App() {

  return (
    <>
      <Provider store={store}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<ProtectRoute><Dashboard /></ProtectRoute>} />


        </Routes>
      </Router> 
      </Provider>   
    </>
  )
}

export default App
