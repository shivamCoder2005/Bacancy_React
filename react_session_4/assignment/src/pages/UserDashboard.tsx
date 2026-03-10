import { Link } from "react-router-dom";
import { useAuthContext } from "../components/AuthProvider";

const UserDashboard = () => {
  const { name, role } = useAuthContext();

  return (
    <>
      <h2>Name :- {name}</h2>
      <h2>Role :- {role}</h2>
      <Link to="/admin">Admin</Link>
    </>
  );
};

export default UserDashboard;
