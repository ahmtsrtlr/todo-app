import { useSelector } from "react-redux";
import Todo from "./Todo";
import type { RootState } from "../redux/store";
import type { TodoType } from "../types/Types";

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todo);

  return (
    <div className="space-y-3">
      {todos && todos.length > 0 ? (
        todos.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Henüz görev yok</div>
          <div className="text-gray-500 text-sm">
            Yukarıdan yeni görev ekleyebilirsiniz
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
