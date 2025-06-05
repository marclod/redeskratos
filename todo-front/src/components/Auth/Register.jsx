import { useState } from 'react';
import { register } from '../../api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert('Registrado com sucesso!');
    } catch (err) {
      alert('Erro no registro: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button type="submit">Registrar</button>
    </form>
  );
}
