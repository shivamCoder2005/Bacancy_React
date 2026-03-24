import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import ProtectedProfile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProtectedProfile name="shivam" />,
  },
]);

export default router;
