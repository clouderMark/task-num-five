import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';
import { createId } from './createId.js';
import { makeErrors } from './makeErrors/makeErrors.js';
import { makePhone } from './makePhone.js';
import { regions } from './regions.js';
import { checkReq } from './checkReq.js';

class User {
  async getAll(req, res, next) {
    try {
      const { region, errors, seed, from, to } = req.body;

      checkReq(region, errors, seed, from, to)

      const randomSeed = seedrandom(seed);
      const sequence = [...Array(to)]
        .map((el) => (el = +`${randomSeed()}`.split('.')[1]))
        .slice(from, to);

      const users = sequence.map(async (el) => {
        const sumEl = sum(el);
        const isMan = sumEl % 2 === 0;
        const thatRigion = region === 0 ? (sumEl % 3) + 1 : region;
        const surnameLength = await regions[thatRigion].surnameLength();
        const maleNameLength = await regions[thatRigion].maleNameLength();
        const femaleNameLength = await regions[thatRigion].femaleNameLength();
        const cityLength = await regions[thatRigion].cityLength();
        const streetLength = await regions[thatRigion].streetLength();

        const surnameIndex = makeLess(el, surnameLength);

        let surname = '';
        let name = '';
        let id = '';

        if (isMan) {
          const userSurname = await regions[thatRigion].surname(surnameIndex);
          const userName = await regions[thatRigion].maleName(
            makeLess(el, maleNameLength)
          );

          surname = userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        } else {
          const userSurname = await regions[thatRigion].surname(surnameIndex);
          const userName = await regions[thatRigion].femaleName(
            makeLess(el, femaleNameLength)
          );

          surname =
            thatRigion === 2
              ? makeRussianFemaleSurname(userSurname.name)
              : userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        }

        const city = await regions[thatRigion]
          .cityName(makeLess(el, cityLength))
          .then((data) => data.name);
        const street = await regions[thatRigion]
          .sreetName(makeLess(el, streetLength))
          .then((data) => data.name);
        const elString = `${el}`;
        const house = elString.slice(0, 2);
        const phone = makePhone(elString, thatRigion);

        const userData = makeErrors(errors, el, {
          name,
          surname,
          id,
          city,
          street,
          house,
          phone,
        });

        return userData;
      });

      res.json(await Promise.all(users));
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
