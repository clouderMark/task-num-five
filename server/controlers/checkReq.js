export const checkReq = (region, errors, seed, from, to) => {
  if (typeof region !== 'number' || region < 0 || region > 3) {
    throw new Error('Something happend with user region. Please check it');
  }

  if (typeof errors !== 'number' || errors < 0 || errors > 1000) {
    throw new Error('Something wrong with amount of error which must be in data. Please check it');
  }

  if (typeof seed !== 'number' || seed < 0) {
    throw new Error('Something wrong with user seed. Please check it');
  }

  if (typeof from !== 'number' || from < 0) {
    throw new Error('Something wrong with initial user index. Please check it');
  }

  if (typeof to !== 'number' || to < 0) {
    throw new Error('Something wrong with amount user data. Please check it');
  }
}