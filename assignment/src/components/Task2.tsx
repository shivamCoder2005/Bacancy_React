// Create a component that starts a setInterval when it mounts, updates a counter every second, and clears the interval in a useEffect cleanup. Unmount the component (e.g. toggle with a button) and confirm the interval stops (no console errors or extra ticks).

import { useEffect, useState } from "react";

const Task2 = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => {
      // always update state using cb if its newer value depends on older value
      setTimer((prev) => prev + 1);
      console.log("timer is running....")
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  function resetTimer() {
    setTimer(0);
  }

  function stopTimer() {
    if (!isRunning) return;
    setIsRunning(false);
  }

  function startTimer() {
    if (isRunning) return;
    setIsRunning(true);
  }
  return (
    <>
      <h2>Timer Value is :- {timer}</h2>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={startTimer}>Start</button>
    </>
  );
};

export default Task2;
