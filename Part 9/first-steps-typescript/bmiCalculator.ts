export const calculateBmi = (height: number, weight: number) => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normalweight';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obesity';
  }

  return 'Input is not number type!';
};

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])

// console.log(calculateBmi(height, weight));
