export const makeLess = (that, thenThat) => {
  if (that > thenThat) {
    return makeLess(that * 0.1, thenThat);
  }

  return that.toFixed();
};