import cors from 'cors';
import express from 'express';
import path from 'path';
import { getAllTasks, getTaskById } from './tasks/tasks';

const app = express();
const { PORT = 4000 } = process.env;
app.use(cors());
app.use(express.json());
// Health route
app.get('/health', (_req, res) => {
  res.send('OK');
});

app.get('/tasks', (_req, res) => res.send(getAllTasks()));

app.get('/tasks/:id', (req, res) => {
  const task = getTaskById(Number(req.params.id));
  const indataId = Math.floor(Math.random() * task.indata.length);
  const input = task.indata[indataId];
  const code = task.encrypt(input);
  res.send({ id: task.id, code, indataId });
});

app.post('/tasks/:id', (req, res) => {
  const task = getTaskById(Number(req.params.id));
  const { indataId, answer } = req.body;
  const input = task.indata[indataId];
  const correct = input === answer;
  if (correct) {
    res.status(200).send('Correct');
    return;
  }

  res.status(406).send('Incorrect');
});

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
