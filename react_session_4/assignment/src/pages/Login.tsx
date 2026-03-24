import { useState } from "react";
import type { UserLoginType } from "../types";
import { useAuthContext } from "../components/AuthProvider";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser, isLoggdin } = useAuthContext();
  const from = location.state?.from?.pathname || "/users";
  const [loginForm, setLoginForm] = useState<UserLoginType>({
    name: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);

  if (isLoggdin) {
    return <Navigate to="/users" replace />;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function login() {
    setLoading(true);
    await new Promise((res, _) => {
      setTimeout(() => res("resolved"), 2000);
    });
    loginUser(loginForm.name, loginForm.role);
    navigate(from, { replace: true });
  }

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <>
      <h2>Welcome Back!!!!</h2>

      <label htmlFor="name">Enter Your name :-</label>
      <input
        type="text"
        id="name"
        value={loginForm.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <label htmlFor="role">Please Select Role :- </label>
      <select id="role" value={loginForm.role} onChange={handleChange}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <br />
      <br />

      <label htmlFor="password">Enter Your Password :-</label>
      <input
        type="password"
        id="password"
        value={loginForm.password}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
