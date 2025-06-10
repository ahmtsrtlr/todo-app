import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { TodoType } from "../types/Types";
import { createTodo } from "../redux/slices/todoSlice";

const TodoCreate = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") {
      alert("Lütfen geçerli bir görev girin.");
      return;
    }
    const payload: TodoType = {
      id: Math.floor(Math.random() * 10000),
      content: newTodo,
    };
    dispatch(createTodo(payload));
    setNewTodo("");
    alert("Görev başarıyla eklendi!");
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
              setNewTodo("");
            }
          }}
          autoFocus
          type="text"
          placeholder="Yeni görev ekle..."
        />
        <button
          onClick={handleCreateTodo}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default TodoCreate;
