import { Surname, MaleName, FemaleName } from '../models/mapping.js';
import AppError from '../errors/AppError.js';


class User {
  async getSurname(index) {
    const surname = await Surname.findOne({index});

    return surname;
  }

  async surnameLength() {
    const surnameLength = await Surname.countDocuments({});

    return surnameLength;
  }

  async getMaleName(index) {
    const maleName = await MaleName.findOne({index});

    return maleName;
  }

  async maleNameLength() {
    const nameLength = await MaleName.countDocuments();

    return nameLength;
  }

  async getFemaleName(index) {
    const femaleName = await FemaleName.findOne({index});

    return femaleName;
  }

  async femaleNameLength() {
    const nameLength = await FemaleName.countDocuments();

    return nameLength;
  }

}

export default new User();
