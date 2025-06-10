import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Todo from "./Todo";
import type { RootState, AppDispatch } from "../redux/store";
import type { TodoType } from "../types/Types";
import { setTodos, clearTodos } from "../redux/slices/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todo);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(clearTodos());
      return;
    }

    const q = query(
      collection(db, "todos"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: TodoType[] = [];
      querySnapshot.forEach((doc) => {
        todosData.push({
          id: doc.id,
          ...doc.data(),
        } as TodoType);
      });
      dispatch(setTodos(todosData));
    });

    return () => unsubscribe();
  }, [user, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">Yükleniyor...</div>
      </div>
    );
  }

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
