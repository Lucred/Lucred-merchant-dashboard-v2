import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { lazy, Suspense } from "react";
import reducer from "./redux/reducer";
import { ProtectRoute } from "./pages/ProtectedRoute";
import Loader from "./components/Loader";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const LazyDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const LazyAddProduct = lazy(
  () => import("./pages/Dashboard/DashboardAddProduct")
);
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyRegister = lazy(() => import("./pages/Register"));
const LazyViewProduct = lazy(() => import("./pages/Dashboard/SingleProduct"));
// const LazyUserGuide = lazy(() => import("./pages/Dashboard/UserGuide"));

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

function App() {
  return (
    <Provider store={store}>
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
              {/* <Route path='user-guide' element={<LazyUserGuide />} /> */}
              <Route path='product/:id' element={<LazyViewProduct />} />
              <Route path='product/add-product' element={<LazyAddProduct />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
