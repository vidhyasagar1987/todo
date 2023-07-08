import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../redux/Slices/TodoSlice";
import { Button, Modal, Box } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TodoForm = ({ setIsAdd, isAdd }) => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const [touched, setTouched] = useState(false);

  const enteredTaskIsValid = task.trim() !== "";

  const TaskInputIsInvalid = !enteredTaskIsValid && touched;

  const submitHandler = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!enteredTaskIsValid) {
      return;
    }

    dispatch(
      addTodos({
        id: Math.floor(Math.random() * 100),
        task: task.trim(),
        completed: false,
      })
    );
    setTask("");
    setIsAdd(false);
    setTouched(false);
  };
  const closeModal = (event, reason) => {
    setIsAdd(false);
    setTask("");
    setTouched(false);
  };

  const handleBlur = (e) => {
    setTouched(true);
  };


  return (
    <>
      <Dialog
        open={isAdd}
        disableEscapeKeyDown={true}
        PaperProps={{
          sx: { maxWidth: "revert", width: 700 },
        }}
        className="custom-dialog"
      >
        <DialogTitle>Add a Task</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <input
              type="text"
              placeholder="Enter a Title"
              value={task}
              onChange={handleChange}
              name="task"
              onBlur={handleBlur}
              className="input-text"
            />
            {TaskInputIsInvalid && (
              <p className="error-message">Please enter a task<sup>*</sup></p>
            )}
          </DialogContent>
          <DialogActions>
            <button
              onClick={closeModal}
              type="button"
              className="button mobile cancel-button"
            >
              Cancel
            </button>
            <button className="button mobile">Add Task</button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default TodoForm;
