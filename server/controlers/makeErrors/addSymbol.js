import { makeLess } from "../makeLess.js";
import { DIVIDER } from "./DIVIDER.js";

export const addSymbol = (str = '', pos = 0) => {
  let symbol = str[makeLess(pos ** 2, str.length)];
  symbol = symbol === DIVIDER ? str[makeLess((pos + 1) ** 2, str.length)] : symbol;

  return str.slice(0, pos) + symbol + str.slice(pos);
};