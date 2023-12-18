import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';

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

      if (region === 2) {
        users = sequence.map(async (el) => {
          const isMan = sum(el) % 2 === 0;
          const surnameDataLength = await surnameLength;
          const maleDataLength = await maleNameLength;
          const femaleDataNameLength = await femaleNameLength;

          const surnameIndex = makeLess(el, surnameDataLength);

          let surname = '';
          let name = '';

          if (isMan) {
            surname = await UserModel.getSurname(surnameIndex).then(
              (data) => data.name
            );
            name = await UserModel.getMaleName(
              makeLess(el, maleDataLength)
            ).then((data) => data.name);
          } else {
            surname = await UserModel.getSurname(surnameIndex).then((data) =>
              makeRussianFemaleSurname(data.name)
            );
            name = await UserModel.getFemaleName(
              makeLess(el, femaleDataNameLength)
            ).then((data) => data.name);
          }

          return { name, surname };
        });
      }

      console.log(await Promise.all(users));

      res.json(await Promise.all(users));
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
