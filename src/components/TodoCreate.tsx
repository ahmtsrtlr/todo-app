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
    <div className="flex items-center justify-between py-4 bg-gray-100 rounded-lg shadow-md px-10">
      <input
        className="border border-gray-300 rounded-lg p-2 flex-1 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        placeholder="Yeni görev ekle"
      />
      <button
        onClick={handleCreateTodo}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Ekleyin
      </button>
    </div>
  );
};

export default TodoCreate;
