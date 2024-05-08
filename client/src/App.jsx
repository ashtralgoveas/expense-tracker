import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const TransactionPage = lazy(() => import("./pages/TransactionPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <>
      {data?.authUser && <Header />}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route
            path="/"
            element={data.authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/transaction/:id"
            element={data.authUser ? <TransactionPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}
export default App;
