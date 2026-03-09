    import { useEffect, useState } from "react";

    function Counter() {
    const [count, setCount] = useState<number>(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!show) return;
        const timerId = setInterval(() => {
        setCount((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [show]);

    return (
        <>
        {show && <h1>{count}</h1>}
        <button onClick={() => setShow((prev) => !prev)}>
            {show ? "Hide" : "Show"}
        </button>
        </>
    );
    }

    export default Counter;
