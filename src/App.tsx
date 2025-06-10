import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Todo App
        </h1>
        <div className="space-y-6">
          <TodoCreate />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
