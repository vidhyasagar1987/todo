import React from "react";
import { useDispatch } from "react-redux";
import {
  changeEditMode,
  deleteTodo,
  getEditItem,
  updateCompleteStatus,
} from "../redux/Slices/TodoSlice";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

const TodoList = ({ t }) => {
  const dispatch = useDispatch();
  const deleteTaskHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const updateTaskHandler = (todo) => {
    dispatch(changeEditMode(true));
    dispatch(getEditItem(todo));
  };

  const completeHandler = (todo) => {
    dispatch(updateCompleteStatus(todo));
  };

  return (
    <div className="todos">
      <input
        type="checkbox"
        onChange={() => completeHandler(t)}
        checked={t.completed ? true : false}
        className="checkbox-input"
      />

      <p className={`${t.completed ? "completed" : ""} todo-text`}> {t.task}</p>

      <div className="icons">
        {!t.completed && (
          <button onClick={() => updateTaskHandler(t)} className="edit-icon">
            <BiEdit />
          </button>
        )}

        <button
          onClick={() => deleteTaskHandler(t.id)}
          className="edit-icon red-color"
        >
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
