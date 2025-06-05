import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Todo from "../components/Todo/Todo";

export default function Home() {
  const [view, setView] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setView("login");
  };

  if (token) return <Todo token={token} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4">
      {view === "login" ? (
        <>
          <Login onLogin={handleLogin} />
          <p className="mt-4 text-sm">
            Não tem conta?{" "}
            <button
              onClick={() => setView("register")}
              className="text-blue-400 hover:underline"
            >
              Registrar
            </button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p className="mt-4 text-sm">
            Já tem conta?{" "}
            <button
              onClick={() => setView("login")}
              className="text-blue-400 hover:underline"
            >
              Entrar
            </button>
          </p>
        </>
      )}
    </div>
  );
}
