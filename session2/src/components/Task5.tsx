import { useEffect, useState } from "react";

const Task5 = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize(): void {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <p>
        Window width: <strong>{width}px</strong>
      </p>
      <small>
        Resize the window to see it update. Unmount to remove the listener.
      </small>
    </>
  );
};

export default Task5;
