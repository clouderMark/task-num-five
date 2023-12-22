import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';
import { sum } from './sum.js';
import { makeRussianFemaleSurname } from './makeRussianFemaleSurname.js';
import { makeLess } from './makeLess.js';
import { createId } from './createId.js';
import { makeErrors } from './makeErrors/makeErrors.js';
import { makePhone } from './makePhone.js';
import { regions } from './regions.js';

class User {
  async getAll(req, res, next) {
    try {
      const { region, errors, seed, from, to } = req.body;

      const randomSeed = seedrandom(seed);
      const sequence = [...Array(to)]
        .map((el) => (el = +`${randomSeed()}`.split('.')[1]))
        .slice(from, to);

      const users = sequence.map(async (el) => {
        const isMan = sum(el) % 2 === 0;
        const surnameLength = await regions[region].surnameLength();
        const maleNameLength = await regions[region].maleNameLength();
        const femaleNameLength = await regions[region].femaleNameLength();
        const cityLength = await regions[region].cityLength();
        const streetLength = await regions[region].streetLength();

        const surnameIndex = makeLess(el, surnameLength);

        let surname = '';
        let name = '';
        let id = '';

        if (isMan) {
          const userSurname = await regions[region].surname(surnameIndex);
          const userName = await regions[region].maleName(
            makeLess(el, maleNameLength)
          );

          surname = userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        } else {
          const userSurname = await regions[region].surname(surnameIndex);
          const userName = await regions[region].femaleName(
            makeLess(el, femaleNameLength)
          );

          surname = region === 2 ? makeRussianFemaleSurname(userSurname.name) : userSurname.name;
          name = userName.name;
          id = createId(userSurname._id, userName._id);
        }

        const city = await regions[region].cityName(makeLess(el, cityLength)).then(
          (data) => data.name
        );
        const street = await regions[region].sreetName(
          makeLess(el, streetLength)
        ).then((data) => data.name);
        const elString = `${el}`;
        const house = elString.slice(0, 2);
        const phone = makePhone(elString);

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
