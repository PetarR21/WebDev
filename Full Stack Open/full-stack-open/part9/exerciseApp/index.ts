import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const { dailyHours, target } = req.body;

  if (!dailyHours || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  const result = calculateExercises(dailyHours, target);

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
