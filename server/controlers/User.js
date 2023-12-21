import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';
import { createId } from './createId.js';
import { makeErrors } from './makeErrors/makeErrors.js';
import { makePhone } from './makePhone.js';

class User {
  async getAll(req, res, next) {
    try {
      const { region, errors, seed, from, to } = req.body;

      const randomSeed = seedrandom(seed);
      const sequence = [...Array(to)].map(
        (el) => (el = +`${randomSeed()}`.split('.')[1])
      ).slice(from, to);

      let users = [];

      // if (region === 2) {
      users = sequence.map(async (el) => {
        const isMan = sum(el) % 2 === 0;
        const surnameLength = await UserModel.surnameLength();
        const maleNameLength = await UserModel.maleNameLength();
        const femaleNameLength = await UserModel.femaleNameLength();
        const cityLength = await UserModel.cityLength();
        const streetLength = await UserModel.streetLength();

        const surnameIndex = makeLess(el, surnameLength);

        let surname = '';
        let name = '';
        let id = '';

        if (isMan) {
          const userSurname = await UserModel.getSurname(surnameIndex);
          const userName = await UserModel.getMaleName(
            makeLess(el, maleNameLength)
          );

          surname = userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        } else {
          const userSurname = await UserModel.getSurname(surnameIndex);
          const userName = await UserModel.getFemaleName(
            makeLess(el, femaleNameLength)
          );

          surname = makeRussianFemaleSurname(userSurname.name);
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        }

        const city = await UserModel.getCityName(makeLess(el, cityLength)).then(
          (data) => data.name
        );
        const street = await UserModel.getSreetName(
          makeLess(el, streetLength)
        ).then((data) => data.name);
        const elString = `${el}`;
        const house = elString.slice(0, 2);
        const phone = makePhone(elString);

        const userData = makeErrors(errors, el, { name, surname, id, city, street, house, phone });

        return userData;
      });
      // }

      // console.log(await Promise.all(users));

      res.json(await Promise.all(users));
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  // getMore(req, res, next) {
  //   try {
  //     const { region, errors, seed,  from } = req.body;
  //   } catch (e) {
  //     next(AppError.badRequest(e.message));
  //   }
  // }
}

export default new User();
