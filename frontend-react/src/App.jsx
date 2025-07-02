import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import TodoPage from "./pages/todos/TodoPage";
import "./assets/styles/App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/" element={<LoginPage replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <AppRoutes />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
