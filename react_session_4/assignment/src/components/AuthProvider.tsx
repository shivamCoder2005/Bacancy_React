import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Role, UserAuthType, AuthContextType } from "../types";

const authContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const result = useContext(authContext);
  if (!result) {
    throw new Error("Please Provide Context Value First");
  }
  return result;
}

type Props = { children: ReactNode };

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserAuthType>({
    name: "",
    role: "USER",
    isLoggdin: false,
  });

  useEffect(() => {
    console.log("**************");
    console.log(user);
    console.log("**************");
  }, [user]);

  function loginUser(name: string, role: Role) {
    setUser({ name: name, role: role, isLoggdin: true });
  }

  function logoutUser() {
    setUser({ name: "", role: "USER", isLoggdin: false });
  }

  const authContextVal: AuthContextType = {
    ...user,
    loginUser,
    logoutUser,
  };

  return (
    <>
      <authContext.Provider value={authContextVal}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthProvider;
