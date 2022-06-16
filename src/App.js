import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase.js";

import Loader from "./components/UI/Loader.jsx";

const Auth = React.lazy(() => import("./pages/Auth"));
const Error = React.lazy(() => import("./pages/Error"));
const UserData = React.lazy(() => import("./pages/UserData"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword.jsx"));

const App = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={loading ? <Loader /> : <Navigate to="/expenses" />}
          />
          <Route
            path="/auth"
            element={
              loading ? (
                <Loader />
              ) : user ? (
                <Navigate to="/expenses" />
              ) : (
                <Auth />
              )
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              loading ? (
                <Loader />
              ) : user ? (
                <Navigate to="/expenses" />
              ) : (
                <ResetPassword forget={false} />
              )
            }
          />
          <Route
            path="/auth/forget-password"
            element={
              loading ? (
                <Loader />
              ) : user ? (
                <Navigate to="/expenses" />
              ) : (
                <ResetPassword forget={true} />
              )
            }
          />
          <Route
            path="/expenses"
            element={
              loading ? (
                <Loader />
              ) : user ? (
                <UserData />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Suspense>
    </React.StrictMode>
  );
};

export default App;
