import { useEffect, useRef, useState } from "react";

const Clock = () => {
  const [timer, setTimer] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const timerIdRef = useRef<number>(null);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    createTimer(0);
    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, []);

  function createTimer(initVal: number): void {
    setTimer(initVal);
    timerIdRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
      console.log("timer is running with id ", timerIdRef.current);
    }, 1000);
  }

  function resetTimer(): void {
    setHistory((prev) => [...prev, timer]);
    setTimer(0);
  }

  function stopTimer(): void {
    setIsStop(true);
    if (timerIdRef.current) clearInterval(timerIdRef.current);
  }

  function resumeTimer(): void {
    setIsStop(false);
    createTimer(timer);
  }

  return (
    <>
      <h1>{timer}</h1>
      <button onClick={isStop ? resumeTimer : stopTimer}>
        {isStop ? "Resume" : "Stop"}
      </button>
      <br />
      <br />
      <button onClick={resetTimer}>Reset</button>
      {history.length > 0 ? (
        <div>
          <br />
          {history.map((i, index) => (
            <div key={index}>Last Vaue is {i}</div>
          ))}
        </div>
      ) : (
        <div>No History Available</div>
      )}
    </>
  );
};

export default Clock;
