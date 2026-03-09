import "./App.css";
import { Task1, Task2, Task3, Protected, UserContext, Task5, Task6_1, Task6_2 } from "./components";
import type { userContextType } from "./components";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const user: userContextType = {
    name: "shivam",
    email: "shivam17@gmail.com",
    isLogin: login,
  };

  return (
    <>
      {/* <button onClick={() => setLogin((prev) => !prev)}>Toggle Login</button>
      <br />
      <br />
      <UserContext.Provider value={user}>
        <Task1 />
        <hr />
        <Task2 />
        <hr />
        <Protected>
          <br />
          <br/>
          <Task3 />
        </Protected>
      </UserContext.Provider>
      <hr />
      <Task5/>
      <hr />
      <Task6_1/> */}
      <Task6_2/>
    </>
  );
}

export default App;
