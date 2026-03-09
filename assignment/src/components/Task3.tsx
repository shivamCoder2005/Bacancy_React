// Build a small “user by ID” viewer: one state for userId, one for user. Use useEffect to fetch when userId changes. Include cleanup so that if the request finishes after userId changed or the component unmounted, you don’t call setUser.

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  age: number;
  city: string;
};

const userList: User[] = [
  { id: 1, name: "shivam", age: 20, city: "Dhg" },
  { id: 2, name: "divy", age: 21, city: "Surat" },
  { id: 3, name: "dhruv", age: 18, city: "Ahemdabad" },
  { id: 4, name: "divya", age: 20, city: "Arvalli" },
  { id: 5, name: "hiren", age: 21, city: "Somnath" },
  { id: 6, name: "yashraj", age: 21, city: "Surendranagar" },
  { id: 7, name: "vrund", age: 10, city: "Ahemdabad" },
  { id: 8, name: "jaidev", age: 2, city: "Nadiad" },
  { id: 9, name: "vipul", age: 45, city: "botad" },
  { id: 10, name: "hardik", age: 200, city: "botad" },
];

async function wait() {
  await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("simulating async operation wait");
    }, Math.random() * 1000);
  });
}

const Task3 = () => {
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchUserById() {
    setLoading(true);
    const result = userList.find((user) => user.id === userId);
    await wait();
    result ? setUser(result) : setUser(null);
    setLoading(false);
  }

  function handleUserIdInput(e: React.ChangeEvent<HTMLInputElement>) {
    const newId = Number(e.target.value);
    setUserId(newId);
  }

  useEffect(() => {
    if (userId == 0) return;
    const timerId = setTimeout(() => {
      fetchUserById();
    }, 500);
    return () => {
      setUser(null);
      clearTimeout(timerId);
    };
  }, [userId]);

  return (
    <>
      <label htmlFor="uid">Enter User id:- </label>
      <input type="number" id="uid" onChange={handleUserIdInput} />
      {loading ? (
        <h2>Fetching User Details...</h2>
      ) : user ? (
        <div>
          <h2>User Details</h2>
          <ul>
            <li>Name : {user.name}</li>
            <li>Age : {user.age}</li>
            <li>City : {user.city}</li>
          </ul>
        </div>
      ) : (
        <h2>User Not Found!!</h2>
      )}
    </>
  );
};

export default Task3;
