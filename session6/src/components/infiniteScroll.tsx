import { useState } from "react";

const Threshold = 250;

const InfiniteScroll = () => {
  const [items, setItems] = useState([...new Array(50)]);
  const [isLoading,setIsLoading] = useState(false)

  async function loadMore() {
    setIsLoading(true)
    return new Promise((resolve, _) => {
      setTimeout(() => {
        setItems((prev) => [...prev, ...new Array(10)]);
        setIsLoading(false)
        resolve("done")
      }, 3000);
    });
  }

  function handleScroll(e) {
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;

    const remainingScroll = scrollHeight - (scrollTop + clientHeight);

    if (remainingScroll <= Threshold && !isLoading) {
      loadMore();
    }
  }
  return (
    <>
      InfiniteScroll
      <div
        onScroll={handleScroll}
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {items.map((item, index) => (
          <li key={index}>{index}</li>
        ))}
      </div>
    </>
  );
};

export default InfiniteScroll;
