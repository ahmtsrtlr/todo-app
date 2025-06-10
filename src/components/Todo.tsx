import { CiCircleCheck, CiEdit, CiCircleRemove } from "react-icons/ci";
import type { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { removeTodoById, updateTodo } from "../redux/slices/todoSlice";
import { useState } from "react";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  const { id, content } = todo;
  const dispatch = useDispatch();

  const [edittable, setEditable] = useState<boolean>(false);
  const [newTodoContent, setNewTodoContent] = useState<string>(content);

  const handleRemoveTodo = () => {
    console.log(id);
    dispatch(removeTodoById(id));
  };
  const handleUpdateTodo = () => {
    if (newTodoContent.trim() === "") {
      alert("Todo content cannot be empty");
      return;
    }
    const payload: TodoType = {
      id: id,
      content: newTodoContent,
    };
    dispatch(updateTodo(payload));
    // Dispatch an action to update the todo content
    // Assuming you have an action like updateTodoById in your todoSlice
    // dispatch(updateTodoById({ id, content: newTodoContent }));
    setEditable(false);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          {edittable ? (
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
              }}
              autoFocus
              type="text"
              onBlur={handleUpdateTodo}
            />
          ) : (
            <span className="text-gray-800 text-lg leading-relaxed">
              {content}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          {!edittable && (
            <button className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 transform hover:scale-110">
              <CiCircleCheck className="w-6 h-6" />
            </button>
          )}

          {edittable ? (
            <button
              onClick={handleUpdateTodo}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <CiCircleCheck className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => setEditable(!edittable)}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <CiEdit className="w-6 h-6" />
            </button>
          )}

          {!edittable && (
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
