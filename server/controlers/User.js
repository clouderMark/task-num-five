import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';
import { createId } from './createId.js';
import { makeErrors } from './makeErrors/makeErrors.js';

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
        let phone = elString.replace(/[a-zA-Z]/g, '').slice(0, 8);
        phone =
          elString[0] == 0 || elString[0] == 1
            ? `+375(25)${phone}`
            : elString[0] % 2 === 0
            ? `+375(29)${phone}`
            : `+375(44)${phone}`;

        let userData = { name, surname, id, city, street, house, phone };
        userData = makeErrors(errors, el, userData);

        return userData;
      });
      // }

      // console.log(await Promise.all(users));

      res.json(await Promise.all(users));
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
