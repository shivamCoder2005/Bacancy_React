import useLocalStorage from ".";

function Demo() {
  const [count, setCount, clearCount] = useLocalStorage("count", 0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(Number(count) + 1)}>+</button>
      <button onClick={() => setCount(Number(count) - 1)}>-</button>
    </>
  );
}

export default Demo;