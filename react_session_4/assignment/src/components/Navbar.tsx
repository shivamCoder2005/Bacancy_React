import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const Navbar = () => {
  const { isLoggdin, logoutUser } = useAuthContext();

  return (
    <>
      <Link to="/home">Home</Link>
      <br />
      <Link to="/about">About</Link>
      {isLoggdin && (
        <>
          <button onClick={logoutUser}>Logout</button>
          <Link to="/users/profile">Profile</Link>
        </>
      )}
    </>
  );
};

export default Navbar;
