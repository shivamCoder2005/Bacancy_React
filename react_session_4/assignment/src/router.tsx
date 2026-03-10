import { createBrowserRouter } from "react-router-dom";
import {
  About,
  Home,
  Login,
  Signup,
  UserDashboard,
  Profile,
  FallBackErrorPage,
} from "./pages/index";
import App from "./App";
import { ProtectedRoute } from "./components";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "users/",
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ index: true, element: <Admin /> }],
  },
  {
    path: "*",
    element: <FallBackErrorPage />,
  },
]);

export default router;
