import { useEffect } from "react";
import { useAuth } from "./authContext";

import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/user/Profile";
import CreateRepo from "./components/repo/CreateRepo";

import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import RepoDetails from "./components/repo/RepoDetails";
import EditRepo from "./components/repo/EditRepo/EditRepo";
import Settings from "./components/Settings/setting";
import Home from "./components/Pages/Home/Home";
import Copilot from "./components/Pages/Copilot/Copilot";

const ProjectRoutes = () => {

      const { currentUser, setCurrentUser } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {

            const userIdFromStorage = localStorage.getItem("userId");

            if (userIdFromStorage && !currentUser) {
                  setCurrentUser(userIdFromStorage);
            }

            if (!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname)) {
                  navigate("/");
            }

            if (userIdFromStorage && location.pathname === "/auth") {
                  navigate("/dashboard");
            }

      }, [currentUser, navigate, setCurrentUser, location.pathname]);


      const element = useRoutes([
            { path: "/", element: <Home /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/auth", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/copilot", element: <Copilot /> },
            { path: "/profile", element: <Profile /> },
            { path: "/create/repo", element: <CreateRepo /> },
            { path: "/repo/:id", element: <RepoDetails /> },
            { path: "/repo/edit/:id", element: <EditRepo /> },
            { path: "/settings", element: <Settings /> }

      ]);

      return element;
};

export default ProjectRoutes;