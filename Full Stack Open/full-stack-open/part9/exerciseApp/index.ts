import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
