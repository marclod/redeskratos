import { useState } from 'react';
import { login } from '../../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      onLogin(res.data.token);
    } catch (err) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Entrar</button>
    </form>
  );
}
