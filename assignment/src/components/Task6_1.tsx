import { useRef, useState } from "react";

interface Props {}

const Task6_1 = ({}: Props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputAgeRef = useRef<HTMLInputElement>(null);

  function getName(): void {
    const myname = inputNameRef.current?.value;
    if (myname) setName(myname);
  }

  function getAge(): void {
    const myAge = inputAgeRef.current?.value;
    if (myAge) setAge(Number(myAge));
    console.log(myAge)
  }

  return (
    <>
      {/* first way where react controls and trigger re render every time name or age change */}
      {/* controlled components */}

      {/* <label htmlFor="name">Enter Your Name :- </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="name">Enter Your Age :- </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setAge(Number(e.target.value))}
      /> */}

      {/* // second way using useRef taking ref of actual dom elements and let dom handle all the change
      // so here changes would directly affect dom not virtual dom so no re render  */}

      {/* uncontrolled components */}

      <label htmlFor="name">Enter Your Name :- </label>
      <input type="text" name="name" id="name" ref={inputNameRef} />
      <br />
      <button onClick={getName}>Get Name</button>
      {name && <h2>Name :- {name}</h2>}
      <br />
      <label htmlFor="name">Enter Your Age :- </label>
      <input type="text" name="name" id="name" ref={inputAgeRef} />
      <br/>
      <button onClick={getAge}>Get Age</button>
      {age!=0 && <h2>Age:- {age}</h2>}
    </>
  );
};

export default Task6_1;
