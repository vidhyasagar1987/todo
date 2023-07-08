import TodoForm from "./components/TodoForm";
import Todos from "./components/Todos";
import { useState } from "react";
import UpdateTodo from "./components/UpdateTodo";
import { useSelector } from "react-redux";
import "./assets/css/defaults.css";

import {RiTodoLine} from "react-icons/ri"

function App() {
  const [isAdd, setIsAdd] = useState(false);

  const { isEdit } = useSelector((state) => state.todo);

  const openModal = () => {
    setIsAdd(true);
  };

  return (
    <>
      <div className="heading"><span className="todo-icon"><RiTodoLine/></span> <h1>Todo List</h1></div>
      <div className="App">
        <TodoForm setIsAdd={setIsAdd} isAdd={isAdd} />
        {isEdit && <UpdateTodo />}
        <Todos />
        <button className="button" onClick={openModal}>
          <span className="button-content">Add a Task</span>
        </button>
      </div>
      <div className="footer">
        <p>
          This Todo App is developed for demo purpose. <br/>
          <a href="https://github.com/vidhyasagar1987" target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
