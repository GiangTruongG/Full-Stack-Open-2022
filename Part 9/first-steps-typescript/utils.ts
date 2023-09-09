export const validateInput = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numbers = args.slice(3, args.length).map(number => Number(number));
  const target = Number(args[2]);

  numbers.forEach(number => {
    if (isNaN(number)) {
      throw new Error('Provided values were not numbers all!');
    }
  });

  return {
    numbers, target
  };
};
