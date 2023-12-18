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

        return { name, surname, id };
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
