import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isEdit: false,
    editItem: {},
    filteredTodos: [],
    status: "ALL",
  },
  reducers: {
    addTodos: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    getEditItem: (state, action) => {
      state.editItem = action.payload;
    },
    updateTodo: (state, action) => {
      const { id } = action.payload;

      const uuIndex = state.todos.findIndex((t) => t.id === parseInt(id));

      const uuItems = [...state.todos];
      uuItems[uuIndex] = action.payload;
      state.todos = uuItems;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    changeEditMode: (state, action) => {
      state.isEdit = action.payload;
    },
    updateCompleteStatus: (state, action) => {
      const { id, completed } = action.payload;

      const uuIndex = state.todos.findIndex((t) => t.id === parseInt(id));

      const uuItems = [...state.todos];
      uuItems[uuIndex] = { ...action.payload, completed: !completed };
      state.todos = uuItems;
    //   state.todos = state.todos.map(t => {
    //     if(t.id === id){
    //         return {...t, completed: !t.completed}
    //     }
    //     return t
    //   })
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    filterHandler: (state, action) => {
      switch (state.status) {
        case "COMPLETED":
          state.filteredTodos = state.todos.filter((t) => t.completed === true);
          break;
        case "INCOMPLETE":
          state.filteredTodos = state.todos.filter(
            (t) => t.completed === false
          );
          break;
        default:
          state.filteredTodos = state.todos;
          break;
      }
    },
  },
});

export const {
  addTodos,
  deleteTodo,
  updateTodo,
  changeEditMode,
  getEditItem,
  updateCompleteStatus,
  updateStatus,
  filterHandler
} = todoSlice.actions;

export default todoSlice.reducer;
