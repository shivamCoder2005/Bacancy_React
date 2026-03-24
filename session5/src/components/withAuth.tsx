import { Navigate } from "react-router-dom";

const withAuth = (Component: React.ElementType) => {
  return function wrappedComponent(props: any) {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/login" replace={true} />;
    }
    return <Component props={props} />;
  };
};

export default withAuth;
