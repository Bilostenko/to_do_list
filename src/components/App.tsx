import { useState, useEffect, useRef } from "react";
import { TodoList } from "./TodoList";
import { ITodo } from "../types/data";

const App: React.FC = () => {

  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        completed: false
      }])
    }
    setValue('')
  }

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const toggleTodo = (id: number): void  =>{
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current?.focus()
  }, [])

  return (
    <div>
      <div className="">
        <input value={value} onChange={handleChange} ref={inputRef} onKeyDown={handleKeyDown} />
        <button 
        onClick={addTodo}
        >Add</button>
      </div>
      <TodoList item={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
};
export { App };