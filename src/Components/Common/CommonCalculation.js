export const ArraySum = (arr) => {
  let arraySum = 0;
  arr.map((val) => {
    return (arraySum += val.money.amount);
  });
  return arraySum;
};
