import { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Todo from '../components/Todo/Todo';

export default function Home() {
  const [view, setView] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  if (token) return <Todo token={token} onLogout={handleLogout} />;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-Do com Auth</h1>
      {view === 'login' ? (
        <>
          <Login onLogin={handleLogin} />
          <p>
            Não tem conta?{' '}
            <button onClick={() => setView('register')}>Registrar</button>
          </p>
        </>
      ) : (
        <>
          <Register />
          <p>
            Já tem conta?{' '}
            <button onClick={() => setView('login')}>Entrar</button>
          </p>
        </>
      )}
    </div>
  );
}
