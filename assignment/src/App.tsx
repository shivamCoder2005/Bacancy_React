import "./App.css";
import { Task1, Task2, Task3, Protected, UserContext, Task5, Task6_1, Task6_2 } from "./components";
import type { userContextType } from "./components";
import { useState } from "react";
import { useLocalStorage } from "./components/custom_hook";

function App() {
  // const [login, setLogin] = useState(false);
  // const user: userContextType = {
  //   name: "shivam",
  //   email: "shivam17@gmail.com",
  //   isLogin: login,
  // };

  const [counter,setCounter, clearCounter] = useLocalStorage("counter", "0");


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
      {/* <Task6_2/> */}
      
        <h2>{counter}</h2>
        <button onClick={() => setCounter((prev) => (parseInt(prev) + 1).toString())}>Increment</button>
        <button onClick={() => setCounter((prev) => (parseInt(prev) - 1).toString())}>Decrement</button>
        <button onClick={clearCounter}>Clear Counter</button>
    </>
  );
}

export default App;
