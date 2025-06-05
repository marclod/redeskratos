import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../../api";

export default function Todo({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    try {
      const res = await fetchTasks(token);
      setTasks(res.data);
    } catch (err) {
      alert("Erro ao buscar tarefas");
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTask(title, token);
    setTitle("");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center px-4">
      <div className="bg-white text-gray-800 w-full max-w-xl p-8 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
          <button
            onClick={onLogout}
            className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nova tarefa"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-2 max-h-[300px] overflow-y-auto">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow"
            >
              <span>{t.title}</span>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-sm bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 transition"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
