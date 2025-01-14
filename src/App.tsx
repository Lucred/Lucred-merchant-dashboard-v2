/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer, { fetchDataStart } from "./redux/reducer";
import { ProtectRoute } from "./pages/ProtectedRoute";
import { lazy, Suspense, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import Loader from "./components/Loader";

const LazyDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const LazyAddProduct = lazy(
  () => import("./pages/Dashboard/DashboardAddProduct")
);
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyRegister = lazy(() => import("./pages/Register"));
const LazyViewProduct = lazy(() => import("./pages/Dashboard/SingleProduct"));

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

function App() {
  const loading = useSelector((state: any) => state.loading);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToastContainer />

        <Routes>
          <Route path='/' element={<LazyLogin />} />
          <Route path='/login' element={<LazyLogin />} />
          <Route path='/register' element={<LazyRegister />} />
          <Route
            path='/dashboard/*'
            element={
              <ProtectRoute>
                <LazyDashboard />
              </ProtectRoute>
            }
          >
            <Route path='product/:id' element={<LazyViewProduct />} />
            <Route path='product/add-product' element={<LazyAddProduct />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
