import { useState } from "react";
import withAuth from "./withAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [useDetails, setUserDetails] = useState(init);
  const navigate = useNavigate();

  function init() {
    return JSON.parse(localStorage.getItem("user")!);
  }

  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <h2>email : {useDetails.email}</h2>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
};

const ProtectedProfile = withAuth(Profile);

export default ProtectedProfile;
