import { useState, type ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'

type Todo = {
  id: string
  text: string
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputTodo, setInputTodo] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTodo(e.target.value)
  }

  const handleAddTodo = () => {
    if (inputTodo.trim().length == 0) return

    const addTodo: Todo = {
      id: uuid(),
      text: inputTodo,
    }
    setTodos([...todos, addTodo])
    setInputTodo('')
  }

  const handleDeleteTodo = (id: string) => {
    const todoList = todos.filter((todo) => todo.id !== id)

    setTodos(todoList)
  }

  return (
    <div>
      <input
        type="text"
        className="text"
        onChange={handleChange}
        value={inputTodo}
      />
      <button onClick={handleAddTodo}>追加</button>
      {todos.length == 0 ? (
        <p>TodoListはありません</p>
      ) : (
        <p>Todoリストが{todos.length}件あります</p>
      )}
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.text}</div>
          <div>
            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TodoList
