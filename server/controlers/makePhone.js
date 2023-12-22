export const makePhone = (str, region) => {
  let phoneNumber;
  const phone = str.replace(/[a-zA-Z]/g, '').slice(0, 8);
  const end = str.at(-1);
  if (region === 1) {
    if (end == 1) {
      phoneNumber = `+1 (907) ${phone}`;
    } else if (end == 2) {
      phoneNumber = `+1 (501) ${phone}`;
    } else if (end == 3) {
      phoneNumber = `+1 (213) ${phone}`;
    } else if (end == 4) {
      phoneNumber = `+1 (725) ${phone}`;
    } else if (end == 5) {
      phoneNumber = `+1 (971) ${phone}`;
    } else {
      phoneNumber = `+1 (808) ${phone}`;
    }
  } else if (region === 2) {
    phoneNumber =
      end == 0 || end == 1
        ? `+375(25)${phone}`
        : end % 2 === 0
        ? `+375(29)${phone}`
        : `+375(44)${phone}`;
  } else if (region === 3) {
    phoneNumber = end == 0 ? `+49 30${phone}` : `+49 1522${phone}`;
  }

  return phoneNumber;
};
