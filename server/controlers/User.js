import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';
import { createId } from './createId.js';

const surnameLength = (async () => UserModel.surnameLength())();
const maleNameLength = (async () => UserModel.maleNameLength())();
const femaleNameLength = (async () => UserModel.femaleNameLength())();
const cityLength = (async () => UserModel.cityLength())();
const streetLength = (async () => UserModel.streetLength())();

class User {
  async getAll(req, res, next) {
    try {
      const { region, errors, seed } = req.body;

      const randomSeed = seedrandom(seed);
      const sequence = [...Array(10)].map(
        (el) => (el = +`${randomSeed()}`.split('.')[1])
      );

      let users = [];

      // if (region === 2) {
      users = sequence.map(async (el) => {
        const isMan = sum(el) % 2 === 0;
        const surnameDataLength = await surnameLength;
        const maleDataLength = await maleNameLength;
        const femaleDataNameLength = await femaleNameLength;
        const cityDataLength = await cityLength;
        const streetDataLength = await streetLength;

        const surnameIndex = makeLess(el, surnameDataLength);

        let surname = '';
        let name = '';
        let id = '';

        if (isMan) {
          const userSurname = await UserModel.getSurname(surnameIndex);
          const userName = await UserModel.getMaleName(
            makeLess(el, maleDataLength)
          );

          surname = userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        } else {
          const userSurname = await UserModel.getSurname(surnameIndex);
          const userName = await UserModel.getFemaleName(
            makeLess(el, femaleDataNameLength)
          );

          surname = makeRussianFemaleSurname(userSurname.name);
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        }

        const city = await UserModel.getCityName(makeLess(el, cityDataLength)).then((data) => data.name);
        const street = await UserModel.getSreetName(makeLess(el, streetDataLength)).then((data) => data.name);
        const elString = `${el}`;
        const house = elString.slice(0, 2);
        let phone = elString.replace(/[a-zA-Z]/g, '').slice(0, 8);
        phone = elString[0] == 0 || elString[0] == 1 ? `+375(25)${phone}` : elString[0] % 2 === 0 ? `+375(29)${phone}` : `+375(44)${phone}`

        return { name, surname, id, city, street, house, phone};
      });
      // }

      console.log(await Promise.all(users));

      res.json(await Promise.all(users));
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
