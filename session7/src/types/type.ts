type TodoType = {
    id: number,
    text: string,
    isCompleted: boolean
}

type AddTodo = Pick<TodoType, "text">

export type { TodoType, AddTodo }