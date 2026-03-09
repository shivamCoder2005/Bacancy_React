import { useMemo, useState } from "react";
import MyList from "./MyList";

type User = {
  name: string;
  age: number;
};

const HeavyComponent = () => {
  const [name, setName] = useState("");
  // const arr = useMemo(() => {
  //   return Array<User>(10000).fill({ name: "shivam", age: 21 });
  // }, []);
  const arr = Array<User>(10000).fill({ name: "shivam", age: 21 });
  return (
    <>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>{name}</h1>
      {arr.map((el, index) => (
        <div key={index}>
          <p>{el.name}</p>
          <p>{el.age}</p>
        </div>
      ))}
      {/* <MyList data={arr} /> */}
    </>
  );
};

export default HeavyComponent;
