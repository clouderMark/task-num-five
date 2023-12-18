// import UserModel from '../models/User.js';
import AppError from '../errors/AppError.js';
import seedrandom from 'seedrandom';

const sum = (num) => {
  if (num < 10) {
    return num;
  }

  return sum(`${num}`.split('').reduce((acc, el) => (acc += +el), 0));
};

class User {
  async getAll(req, res, next) {
    try {
      const { region, errors, seed } = req.body;

      console.log({ region, errors, seed });
      // const users = await UserModel.getAll();
      const randomSeed = seedrandom(seed);
      const sequence = [...Array(10)].map(
        (el) => (el = +`${randomSeed()}`.split('.')[1])
      );

      const isMan = sum(sequence[0]) % 2 === 0;
      console.log({ isMan });

      // res.json(users);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new User();
