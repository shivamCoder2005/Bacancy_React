// Add a new component that has two pieces of state: name (string) and age (number). Render them and add buttons to increment age and update name from an input.

import { useState } from "react";

type errorType = {
  message: string;
};

const Task1 = () => {
  const [age, setAge] = useState(1);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState("");
  const [error, setError] = useState<errorType | null>(null);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function updateName(): void {
    setShowName(name);
  }

  function incAge(): void {
    if (error) setError(null);
    setAge((prev) => prev + 1);
  }

  function decAge(): void {
    if (age <= 1) {
      setError({ message: "Age Can't Be Negative" });
      return;
    }
    setAge((prev) => prev - 1);
  }

  return (
    <>
      <label htmlFor="name">Enter Your Name :- </label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => handleNameChange(e)}
      />
      <br />
      <br />
      <button onClick={updateName}>Update Name</button>
      <br />
      <h2>Name :- {showName}</h2>
      <h2>Age :- {age}</h2>
      <button onClick={incAge}>+</button> &nbsp;
      <button onClick={decAge}>-</button>
      <br />
      {error && <span>{error.message}</span>}
    </>
  );
};

export default Task1;
