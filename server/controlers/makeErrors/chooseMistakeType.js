import { addSymbol } from './addSymbol.js';
import { deleteSymbol } from './deleteSymbol.js';
import { moveSymbols } from "./moveSymbols.js";

export const chooseMistakeType = (num) => {
  const mistakeWill = num % 3;

  if (mistakeWill === 0) {
    return deleteSymbol;
  } else if (mistakeWill === 1) {
    return addSymbol;
  }
  return moveSymbols;
};
