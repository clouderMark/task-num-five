import { DIVIDER } from "./DIVIDER.js";

export const moveSymbols = (str = '', pos = 0) => {
  if (pos === str.length - 1) {
    return str.slice(0, pos - 1) + str.slice(pos) + str.slice(pos - 1, pos);
  }
  if (str[pos] === DIVIDER || str[pos + 1] === DIVIDER) {
    pos++;
  }
  return (
    str.slice(0, pos) +
    str.slice(pos + 1, pos + 2) +
    str.slice(pos, pos + 1) +
    str.slice(pos + 2)
  );
};
