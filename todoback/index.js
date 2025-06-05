const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const User = require('./models/User');
const Task = require('./models/Task');
const auth = require('./middleware/auth');

const app = express();

app.use(cors("*"));
app.use(express.json());

const MONGO_URL = 'mongodb://localhost:27017/todo_db';
const JWT_SECRET = 'segredoSuperSeguro123';

mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Registro
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ error: 'Usuário já existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();
  res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Criar task
app.post('/api/tasks', auth, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, user: req.userId });
  await task.save();
  res.status(201).json(task);
});

// Listar tasks
app.get('/api/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// Deletar task
app.delete('/api/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  await Task.deleteOne({ _id: id, user: req.userId });
  res.json({ message: 'Task deletada' });
});

app.listen(3000,"0.0.0.0", () => {
  console.log('Servidor rodando na porta 3000');
});
