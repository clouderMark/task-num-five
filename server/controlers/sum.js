export const sum = (num) => {
  if (num < 10) {
    return num;
  }

  return sum(`${num}`.split('').reduce((acc, el) => (acc += +el), 0));
};