import { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../../api';

export default function Todo({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    try {
      const res = await fetchTasks(token);
      setTasks(res.data);
    } catch (err) {
      alert('Erro ao buscar tarefas');
    }
  };

  const handleAdd = async () => {
    if (!title) return;
    await createTask(title, token);
    setTitle('');
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
    <div>
      <h2>Minhas Tarefas</h2>
      <button onClick={onLogout}>Sair</button><br /><br />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova tarefa" />
      <button onClick={handleAdd}>Adicionar</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title} <button onClick={() => handleDelete(t._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
