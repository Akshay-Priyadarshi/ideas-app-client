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
import Search from "./pages/search/Search";
import CreateIdea from "./pages/create-idea/CreateIdea";
import IdeaDetails from "./pages/idea-details/IdeaDetails";
import UpdateIdea from "./pages/update-idea/UpdateIdea";

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
                <Route path="search" element={<Search />} />
                <Route path="create" element={<CreateIdea />} />
                <Route path="Update/:id" element={<UpdateIdea />} />
                <Route path="idea/:id" element={<IdeaDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
