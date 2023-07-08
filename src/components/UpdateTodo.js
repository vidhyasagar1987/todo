import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEditMode, updateTodo } from "../redux/Slices/TodoSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const UpdateTodo = () => {
  const { editItem, isEdit } = useSelector((state) => state.todo);

  const [editTask, setEditTask] = useState(editItem.task);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEditTask(e.target.value);
  };

  const [touched, setTouched] = useState(false);

  const enteredTaskIsValid = editTask.trim() !== "";

  const TaskInputIsInvalid = !enteredTaskIsValid && touched;

  const submitHandler = (e) => {
    e.preventDefault();
    setTouched(true);
    if (editTask === "") {
      return;
    }
    dispatch(updateTodo({ ...editItem, task: editTask.trim() }));
    setEditTask("");
    dispatch(changeEditMode(false));
    setTouched(false);
  };
  const closeModal = (event, reason) => {
    dispatch(changeEditMode(false));
    setTouched(false);
  };


  const handleBlur = (e) => {
    setTouched(true);
  };



  return (
    <>
      <Dialog
        open={isEdit}
        disableEscapeKeyDown={true}
        PaperProps={{
          sx: { maxWidth: "revert", width: 700, padding: 2 },
        }}
      >
        <DialogTitle>Update a Task</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <input
              type="text"
              placeholder="Enter a Title"
              value={editTask}
              onChange={handleChange}
              name="task"
              className="input-text"
            />
            {TaskInputIsInvalid && (
              <p className="error-message">
                Please enter a task<sup>*</sup>
              </p>
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
            <button className="button mobile">Update Task</button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateTodo;
