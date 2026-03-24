import { useEffect, useRef, useState } from "react";

const ObserverPractice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log(first);
        if (first.isIntersecting) {
          console.log("dekahi gayu");
          // setIsVisible(true);
        } else {
          // setIsVisible(false);
          console.log("nathi dekhatu");
        }
      },
      { threshold: 0.2, rootMargin: "200px" },
    );
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
  }, []);
  return (
    <>
      ObserverPractice
      <div
        style={{
          height: "1000px",
          width: "1000px",
          backgroundColor: "red",
        }}
      >
        red
      </div>
      <div
        ref={targetRef}
        style={{ height: "100px", width: "100px", border: "1px solid black" }}
      >
        target
      </div>
    </>
  );
};

export default ObserverPractice;
