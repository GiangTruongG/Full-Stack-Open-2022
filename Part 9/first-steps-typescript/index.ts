import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (!height || !weight || typeof height === 'string' || typeof weight === 'string') {
    return res.status(400).json({
      error: 'Input is not number type!'
    });
  }

  const result = calculateBmi(height, weight);
  
  return res.json({
    height: height,
    weight: weight,
    bmi: result
  });
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/exercises', (req, res) => {
  type DailyExercises = string[];

  const containsNaN = (arr: string[]) => {
    return arr.some(element => isNaN(Number(element)));
  };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;

  const dailyExercises1 = dailyExercises as DailyExercises;

  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  } else if (isNaN(Number(target))) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  } else if (containsNaN(dailyExercises1)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExercises, Number(target));
  
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
