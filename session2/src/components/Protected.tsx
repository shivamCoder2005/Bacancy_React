import type { PropsWithChildren } from "react";
import { useUserContext } from "./Task4";

const Protected = ({ children }: PropsWithChildren) => {
  const userDetail = useUserContext();
  console.log(userDetail)
  if (!userDetail || userDetail.isLogin===false) {
    return <><br/>Pleas Login First!!</>;
  }
  return <>{children}</>;
};

export default Protected;