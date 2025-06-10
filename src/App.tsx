import RouterConfig from "./config/RouterConfig";
import { useAuth } from "./hooks/useAuth";

function App() {
  useAuth();

  return <RouterConfig />;
}

export default App;
