import React, { useCallback, useEffect, useState } from "react";
import type { TodoType } from "../types/type";
import Todo from "./Todo";

const TodoApp = () => {
  const [todoData, setTodoData] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [filterTodo, setFilterTodo] = useState<TodoType[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    setSearch(e.target.value.trim().toLowerCase());
  }

  function searchTodo() {
    console.log("searching...");
    const result = todoList.filter((todo) => todo.text.includes(search));
    if (result.length == 0) {
      setError("No Todos Found");
      return;
    }
    setFilterTodo(result);
  }

  useEffect(() => {
    if (search == "") {
      setFilterTodo([]);
      return;
    }
    const timerId = setTimeout(() => searchTodo(), 500);
    return () => clearTimeout(timerId);
  }, [search]);

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setTodoList((prev) => [
        ...prev,
        { id: Date.now(), text: todoData, isCompleted: false },
      ]);
      setTodoData("");
    }
  }

  const toggleIsCompleted = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      setTodoList((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isCompleted: e.target.checked } : t,
        ),
      );
    },
    [],
  );

  return (
    <>
      <label htmlFor="search">search:-</label>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={handleSearch}
      />
      <label htmlFor="todo">Add Todo:-</label>
      <input
        type="text"
        name="todo"
        id="todo"
        value={todoData}
        onChange={(e) => setTodoData(e.target.value)}
        onKeyDown={addTodo}
      />
      {error ? (
        <span>{error}</span>
      ) : filterTodo.length > 0 ? (
        <div>
          {filterTodo.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleIsCompleted={toggleIsCompleted}
            />
          ))}
        </div>
      ) : (
        <div>
          {todoList.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleIsCompleted={toggleIsCompleted}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TodoApp;
