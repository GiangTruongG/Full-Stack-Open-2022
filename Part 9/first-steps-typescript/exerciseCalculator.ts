import { validateInput } from "./utils";

interface calculateExercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDesc: string,
  target: number,
  average: number
}

export const calculateExercises = (numbers: number[], target: number): calculateExercisesResult => {
  let numberOfTrainingDays = 0;
  const numberOfDays = numbers.length;
  let rating = null;
  let totalHours = 0;

  numbers.forEach(number => {
    if (Number(number) === 0) {
      return;
    }

    totalHours = totalHours + Number(number);
    numberOfTrainingDays++;
  });

  const averageTime = totalHours / numberOfDays;

  rating = numberOfTrainingDays === (numberOfDays / 2) ? 3 : numberOfTrainingDays < (numberOfDays / 2) ? 1 : numberOfTrainingDays > (numberOfDays / 2) ? 2 : 0;

  return {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: numberOfTrainingDays === numberOfDays ? true : false,
    rating: rating,
    ratingDesc: rating === 1 ? 'too bad' : rating === 2 ? 'not too bad but could be better' : rating === 3 ? 'very good' : '',
    target: target,
    average: averageTime
  };
};

const input: string[] = process.argv;

try {
  const { numbers, target } = validateInput(input);
  console.log(calculateExercises(numbers, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }

  console.log(errorMessage);
}
