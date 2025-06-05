import { useState } from "react";
import { login } from "../../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      onLogin(res.data.token);
    } catch (err) {
      alert("Erro no login: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo de volta
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 text-sm mb-1"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
