import express from 'express';
import calculator from './calculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: '...' });
  }

  const result = calculator(Number(value1), Number(value2), op);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
