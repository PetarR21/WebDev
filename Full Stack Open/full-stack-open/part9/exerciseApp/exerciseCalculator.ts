interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((d) => d !== 0).length;

  const average =
    dailyHours.reduce((a, b) => {
      return a + b;
    }, 0) / periodLength;

  const success = average >= target;
  const rating = success ? 3 : average <= target / 2 ? 1 : 2;
  const ratingDescription = rating === 3 ? 'good' : rating === 2 ? 'not too bad, but good be better' : 'bad';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const target: number = Number(process.argv[2]);
const array: Array<number> = process.argv.slice(3).map((a) => Number(a));
console.log(calculateExercises(array, target));
