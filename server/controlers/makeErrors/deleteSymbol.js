import { DIVIDER } from './DIVIDER.js';

export const deleteSymbol = (str = '', pos = 0) => {
  if (str[pos] === DIVIDER) {
    pos += 1;
  }

  return str.slice(0, pos) + ' ' + str.slice(pos + 1);
};
