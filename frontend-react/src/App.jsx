import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import TodoPage from "./pages/todos/TodoPage";
import "./assets/styles/App.css";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage currentUser={currentUser} onLogin={login} />}
        />

        <Route
          path="/todo"
          element={<TodoPage currentUser={currentUser} onLogout={logout} />}
        />

        <Route
          path="*"
          element={
            <LoginPage currentUser={currentUser} onLogin={login} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
