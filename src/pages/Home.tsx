import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Todo App
        </h2>
        <div className="space-y-6">
          <TodoCreate />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Home;
