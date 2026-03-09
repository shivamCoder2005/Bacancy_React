import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

async function fetchPosts(): Promise<Post[] | void> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const result: Post[] = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function getData() {
      const result = await fetchPosts();
      if (result && result.length > 0) {
        setPosts(result);
      }
    }
    getData();
  }, []);

  if (posts.length == 0) return <>No Posts Found</>;
  return (
    <>
      {posts.map((p) => (
        <div key={p.id}>
          <h1>{p.id}</h1>
          <h2>{p.title}</h2>
        </div>
      ))}
    </>
  );
}

export default AllPosts;
