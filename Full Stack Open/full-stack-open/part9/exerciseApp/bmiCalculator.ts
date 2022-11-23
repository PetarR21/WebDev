const calculateBmi = (height: number, weight: number): String => {
  const bmi = weight / ((height * height) / 10000);

  if (bmi < 18.5) {
    return 'Underweight (Unhealthy)';
  } else if (bmi <= 22.9) {
    return 'Normal range (Healthy)';
  } else if (bmi <= 24.9) {
    return 'Overweight I (At risk)';
  } else if (bmi <= 29.9) {
    return 'Overweight II (Moderately obese)	';
  } else {
    return 'Overweight III (Severely obese)';
  }
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export default calculateBmi;
