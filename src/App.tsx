import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import { Provider, useDispatch, useSelector } from "react-redux"
import { ToastContainer } from 'react-toastify'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducer, { fetchDataStart } from './redux/reducer';
import { ProtectRoute } from './pages/ProtectedRoute'
import { lazy, Suspense, useEffect } from 'react';
import { Circles } from 'react-loader-spinner'
import Loader from './components/Loader'
const LazyDashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const LazyLogin = lazy(() => import('./pages/Login'));

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

function App() {
  const loading = useSelector((state: any) => state.loading)

  return (
    <>

      <Suspense fallback={<Loader />}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<LazyLogin />} />
            <Route path="/dashboard/*" element={<ProtectRoute><LazyDashboard /></ProtectRoute>} />
          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
