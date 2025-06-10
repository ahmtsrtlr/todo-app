import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoInitialState, TodoType } from "../../types/Types";

const initialState: TodoInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodoById: (
      state: TodoInitialState,
      action: PayloadAction<number>
    ) => {
      state.todos = state.todos.filter(
        (todo: TodoType) => todo.id !== action.payload
      );
    },
  },
});

export const { createTodo, removeTodoById } = todoSlice.actions;

export default todoSlice.reducer;
