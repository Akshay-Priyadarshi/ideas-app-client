import React from "react";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Authenticated from "./components/authenticated/Authenticated";
import OnlyUnauthenticated from "./components/only-unauthenticated/OnlyUnauthenticated";

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route
                path="/login"
                element={
                    <OnlyUnauthenticated>
                        <Login />
                    </OnlyUnauthenticated>
                }
            />
            <Route
                path="/signup"
                element={
                    <OnlyUnauthenticated>
                        <Signup />
                    </OnlyUnauthenticated>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <Authenticated>
                        <Dashboard />
                    </Authenticated>
                }
            />
        </Routes>
    );
}

export default App;
