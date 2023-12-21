export const makePhone = (str) => {
  const phone = str.replace(/[a-zA-Z]/g, '').slice(0, 8);
  return str.at(-1) == 0 || str.at(-1) == 1
    ? `+375(25)${phone}`
    : str.at(-1) % 2 === 0
    ? `+375(29)${phone}`
    : `+375(44)${phone}`;
};
