import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function loginUser(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("token", "abc123");
    localStorage.setItem("user",JSON.stringify(formData))
    navigate("/profile");
  }

  return (
    <>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Enter Email :- </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Enter password :- </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
