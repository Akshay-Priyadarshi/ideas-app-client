import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Authenticated from "./components/authenticated/Authenticated";
import OnlyUnauthenticated from "./components/only-unauthenticated/OnlyUnauthenticated";
import Feed from "./pages/feed/Feed";
import Favourite from "./pages/favourite/Favourite";
import NotFound from "./pages/not-found/NotFound";

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
            >
                <Route index element={<Feed />} />
                <Route path="favourite" element={<Favourite />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
