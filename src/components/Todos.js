import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";
import { updateStatus, filterHandler } from "../redux/Slices/TodoSlice";

const Todos = () => {
  const { todos, filteredTodos, status } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const statusHandler = (e) => {
    dispatch(updateStatus(e.target.value));
  };

  useEffect(() => {
    dispatch(filterHandler());
  }, [todos, status, dispatch]);

  let errorMessage;

  if (status === "ALL") {
    errorMessage = <p className="default-meesage">Add a Task to Get Started</p>;
  }
  if (status === "COMPLETED") {
    errorMessage = (
      <p className="default-meesage">No Completed Tasks available</p>
    );
  }
  if (status === "INCOMPLETE") {
    errorMessage = (
      <p className="default-meesage">No Incomplete Tasks available</p>
    );
  }
  if (status === "INCOMPLETE" && todos.length === 0) {
    errorMessage = <p className="default-meesage">Add a Task to Get Started</p>;
  }

  if (status === "COMPLETED" && todos.length === 0) {
    errorMessage = <p className="default-meesage">Add a Task to Get Started</p>;
  }

  return (
    <>
      {todos.length > 0 && (
        <div className="filter">
          <p>Filter By Status:</p>
          <select onChange={statusHandler} className="select-dropdown">
            <option value={"ALL"}>All</option>
            <option value={"COMPLETED"}>Completed</option>
            <option value={"INCOMPLETE"}>Incomplete</option>
          </select>
        </div>
      )}
      <div className="container">
        {filteredTodos.length > 0
          ? filteredTodos.map((t) => <TodoList key={t.id} t={t} />)
          : errorMessage}
      </div>
    </>
  );
};

export default Todos;
