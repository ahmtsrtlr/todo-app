import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createTodo } from "../redux/slices/todoSlice";

const TodoCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.todos);
  const [newTodo, setNewTodo] = useState<string>("");

  const handleCreateTodo = async () => {
    if (newTodo.trim() === "" || !user) {
      return;
    }

    try {
      await dispatch(
        createTodo({
          content: newTodo,
          userId: user.uid,
        })
      );
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <input
          className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleCreateTodo();
            }
          }}
          autoFocus
          type="text"
          placeholder="Yeni görev ekle..."
          disabled={loading}
        />
        <button
          onClick={handleCreateTodo}
          disabled={loading || newTodo.trim() === ""}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </div>
  );
};

export default TodoCreate;
