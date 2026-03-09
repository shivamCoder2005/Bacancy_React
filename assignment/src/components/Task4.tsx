// In the sandbox, add a context (e.g. ThemeContext or UserContext), wrap part of the app in a Provider, and build a child component that reads the value with useContext and displays it (e.g. theme name or user name).

import { useContext, createContext } from "react";

export type userContextType = {
  name: string;
  email: string;
  isLogin: boolean;
};

export const UserContext = createContext<userContextType | null>(null);

export function useUserContext(): userContextType {
  const userDetails = useContext(UserContext);
  if (!userDetails) throw new Error("User Not Found");
  return userDetails;
}
