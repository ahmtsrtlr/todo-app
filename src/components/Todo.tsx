import { CiCircleCheck, CiEdit, CiCircleRemove } from "react-icons/ci";
import type { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { removeTodoById } from "../redux/slices/todoSlice";
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

  return (
    <div className="flex items-center justify-between  bg-white rounded-lg shadow-md py-4 px-10 mb-4 hover:shadow-lg transition-shadow duration-300">
      {edittable ? (
        <input
          className="border border-gray-300 rounded-lg p-2 flex-1 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTodoContent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewTodoContent(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setEditable(false);
            }
          }}
          autoFocus
          type="text"
          onBlur={() => setEditable(false)}
        />
      ) : (
        <span className="text-gray-800">{content}</span>
      )}
      <div className="flex items-center">
        {!edittable && (
          <button className="text-green-500 hover:text-green-600 hover:scale-110 transition-transform duration-200">
            <CiCircleCheck className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setEditable(!edittable)}
          className="text-blue-500 hover:text-blue-600 mx-2 hover:scale-110 transition-transform duration-200"
        >
          {edittable ? (
            <CiCircleCheck className="w-5 h-5" />
          ) : (
            <CiEdit className="w-5 h-5" />
          )}
        </button>
        {!edittable && (
          <button
            onClick={handleRemoveTodo}
            className="text-red-500 hover:text-red-600 hover:scale-110 transition-transform duration-200"
          >
            <CiCircleRemove className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
