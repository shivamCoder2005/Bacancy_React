import React from "react";
import type { TodoType } from "../types/type";

type Props = {
  todo: TodoType;
  toggleIsCompleted: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
};

const Todo = React.memo(({ todo, toggleIsCompleted }: Props) => {
  console.log(`${todo.text} is re rendering`);
  return (
    <>
      <div>
        <p>{todo.text}</p>
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          checked={todo.isCompleted}
          onChange={(e) => toggleIsCompleted(e, todo.id)}
        />
      </div>
    </>
  );
});

export default Todo;
