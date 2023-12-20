import memoizee from "memoizee";
import { Surname, MaleName, FemaleName, City, Street } from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class User {
  constructor() {
    this.surnameLength = memoizee(this.surnameLength);
    this.maleNameLength = memoizee(this.maleNameLength);
    this.femaleNameLength = memoizee(this.femaleNameLength);
    this.cityLength = memoizee(this.cityLength);
    this.streetLength = memoizee(this.streetLength);
  }
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

  async getCityName(index) {
    const city = await City.findOne({index});

    return city;
  }

  async cityLength() {
    const cityLength = await City.countDocuments();

    return cityLength;
  }

  async getSreetName(index) {
    const street = await Street.findOne({index});

    return street;
  }

  async streetLength() {
    const streetLength = await City.countDocuments();

    return streetLength;
  }

}

export default new User();
