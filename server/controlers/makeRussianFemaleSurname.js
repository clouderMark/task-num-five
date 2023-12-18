export const makeRussianFemaleSurname = (str = '') => {
  const lastTwo = str.slice(-2);

  if (['ов', 'ев', 'ёв', 'ин', 'ын'].includes(lastTwo)) {
    return `${str}a`;
  } else if (['ый', 'ой', 'ий'].includes(lastTwo)) {
    return `${str.slice(0, -2)}ая`;
  }

  const lastThree = str.slice(-3);

  if (['ский', 'цкий'].includes(lastThree)) {
    return `${str.slice(0, -2)}ая`;
  }

  return str;
};
