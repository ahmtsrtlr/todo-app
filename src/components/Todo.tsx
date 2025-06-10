import { CiCircleCheck, CiEdit, CiCircleRemove } from "react-icons/ci";
import type { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { removeTodoById, updateTodo } from "../redux/slices/todoSlice";
import { useState } from "react";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  const { id, content, completed } = todo;
  const dispatch = useDispatch<AppDispatch>();

  const [editable, setEditable] = useState<boolean>(false);
  const [newTodoContent, setNewTodoContent] = useState<string>(content);

  const handleRemoveTodo = async () => {
    try {
      await dispatch(removeTodoById(id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const handleUpdateTodo = async () => {
    if (newTodoContent.trim() === "") {
      setNewTodoContent(content);
      setEditable(false);
      return;
    }

    try {
      await dispatch(
        updateTodo({
          id: id,
          content: newTodoContent,
          completed: completed,
        })
      );
      setEditable(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await dispatch(
        updateTodo({
          id: id,
          content: content,
          completed: !completed,
        })
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div
      className={`group bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300 ${
        completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          {editable ? (
            <input
              className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              value={newTodoContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewTodoContent(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleUpdateTodo();
                }
                if (e.key === "Escape") {
                  setNewTodoContent(content);
                  setEditable(false);
                }
              }}
              autoFocus
              type="text"
              onBlur={handleUpdateTodo}
            />
          ) : (
            <span
              className={`text-gray-800 text-lg leading-relaxed ${
                completed ? "line-through" : ""
              }`}
            >
              {content}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          {!editable && (
            <button
              onClick={handleToggleComplete}
              className={`p-2 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                completed
                  ? "text-green-600"
                  : "text-green-500 hover:text-green-600"
              }`}
            >
              <CiCircleCheck className="w-6 h-6" />
            </button>
          )}

          {editable ? (
            <button
              onClick={handleUpdateTodo}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <CiCircleCheck className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setEditable(!editable)}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <CiEdit className="w-6 h-6" />
            </button>
          )}

          {!editable && (
            <button
              onClick={handleRemoveTodo}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <CiCircleRemove className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
