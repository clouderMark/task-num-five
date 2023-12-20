import { randomInt } from 'crypto';
import { chooseMistakeType } from './chooseMistakeType.js';
import { DIVIDER } from './DIVIDER.js';

const defaultData = {
  name: '',
  surname: '',
  id: '',
  city: '',
  street: '',
  house: '',
  phone: '',
};

export const makeErrors = (errors = 0, seed = 0, data = defaultData) => {
  let userData = `${data.id}${DIVIDER}${data.name}${DIVIDER}${data.surname}${DIVIDER}${data.city}${DIVIDER}${data.street}${DIVIDER}${data.house}${DIVIDER}${data.phone}`;
  const seedArr = `${seed}`.split('').map((el) => +el);
  const seedArrLength = seedArr.length - 1;
  let possition = 0;
  let count = 0;
  const loopsFromTenths = errors % errors.toFixed() / 0.25;

  for (let i = 0; i < errors.toFixed(); i++) {
    const num = seedArr[count];
    const mistake = chooseMistakeType(num);
    const length = userData.length - 1;

    if (count === seedArrLength) {
      count = 0;
    } else {
      count++;
    }

    possition += num;

    if (possition >= length) {
      possition -= length;
    }

    userData = mistake(userData, possition);
  }

  if (loopsFromTenths) {
    for (let i = 0; i < loopsFromTenths; i++) {
      const random = randomInt(0, 4);

      if (random === 0) {
        const num = seedArr[count];
        const mistake = chooseMistakeType(num);
        const length = userData.length - 1;
    
        if (count === seedArrLength) {
          count = 0;
        } else {
          count++;
        }
    
        possition += num;
    
        if (possition >= length) {
          possition -= length;
        }
    
        userData = mistake(userData, possition);
      }
    }
  }

  const [id, name, surname, city, street, house, phone] =
    userData.split(DIVIDER);

  return { id, name, surname, city, street, house, phone };
};
