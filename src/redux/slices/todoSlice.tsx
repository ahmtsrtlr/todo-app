import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import type { TodoInitialState, TodoType } from "../../types/Types";

const initialState: TodoInitialState = {
  todos: [],
  loading: false,
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (
    todoData: { content: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        content: todoData.content,
        completed: false,
        userId: todoData.userId,
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        content: todoData.content,
        completed: false,
        userId: todoData.userId,
        createdAt: new Date().toISOString(), // ISO string kullanın
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTodoById = createAsyncThunk(
  "todos/removeTodoById",
  async (todoId: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      return todoId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (
    todoData: { id: string; content: string; completed: boolean },
    { rejectWithValue }
  ) => {
    try {
      const todoRef = doc(db, "todos", todoData.id);
      await updateDoc(todoRef, {
        content: todoData.content,
        completed: todoData.completed,
      });
      return todoData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // State'e yeni todo'yu ekleyin
      })
      .addCase(createTodo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeTodoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodoById.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload); // State'ten todo'yu kaldırın
      })
      .addCase(removeTodoById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...action.payload }; // State'te todo'yu güncelleyin
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTodos, setLoading, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
