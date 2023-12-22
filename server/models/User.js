import memoizee from 'memoizee';
import {
  Surname,
  MaleName,
  FemaleName,
  City,
  Street,
  AmericanSurname,
  AmericanMaleName,
  AmericanFemaleName,
  AmericanCity,
  AmericanStreet,
  GermanSurname,
  GermanMaleName,
  GermanFemaleName,
  GermanCity,
  GermanStreet,
} from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class User {
  constructor() {
    this.surnameLength = memoizee(this.surnameLength);
    this.maleNameLength = memoizee(this.maleNameLength);
    this.femaleNameLength = memoizee(this.femaleNameLength);
    this.cityLength = memoizee(this.cityLength);
    this.streetLength = memoizee(this.streetLength);

    this.americanSurnameLength = memoizee(this.americanSurnameLength);
    this.americanMaleNameLength = memoizee(this.americanMaleNameLength);
    this.americanFemaleNameLength = memoizee(this.americanFemaleNameLength);
    this.americanCityLength = memoizee(this.americanCityLength);
    this.americanStreetLength = memoizee(this.americanStreetLength);

    this.germanSurnameLength = memoizee(this.germanSurnameLength);
    this.germanMaleNameLength = memoizee(this.germanMaleNameLength);
    this.germanFemaleNameLength = memoizee(this.germanFemaleNameLength);
    this.germanCityLength = memoizee(this.germanCityLength);
    this.germanStreetLength = memoizee(this.germanStreetLength);
  }
  async getSurname(index) {
    const surname = await Surname.findOne({ index });

    return surname;
  }

  async surnameLength() {
    const surnameLength = await Surname.countDocuments({});

    return surnameLength;
  }

  async getMaleName(index) {
    const maleName = await MaleName.findOne({ index });

    return maleName;
  }

  async maleNameLength() {
    const nameLength = await MaleName.countDocuments();

    return nameLength;
  }

  async getFemaleName(index) {
    const femaleName = await FemaleName.findOne({ index });

    return femaleName;
  }

  async femaleNameLength() {
    const nameLength = await FemaleName.countDocuments();

    return nameLength;
  }

  async getCityName(index) {
    const city = await City.findOne({ index });

    return city;
  }

  async cityLength() {
    const cityLength = await City.countDocuments();

    return cityLength;
  }

  async getSreetName(index) {
    const street = await Street.findOne({ index });

    return street;
  }

  async streetLength() {
    const streetLength = await City.countDocuments();

    return streetLength;
  }

  async getAmericanSurname(index) {
    const surname = await AmericanSurname.findOne({ index });

    return surname;
  }

  async americanSurnameLength() {
    const surnameLength = await AmericanSurname.countDocuments({});

    return surnameLength;
  }

  async getAmericanMaleName(index) {
    const maleName = await AmericanMaleName.findOne({ index });

    return maleName;
  }

  async americanMaleNameLength() {
    const nameLength = await AmericanMaleName.countDocuments();

    return nameLength;
  }

  async getAmericanFemaleName(index) {
    const femaleName = await AmericanFemaleName.findOne({ index });

    return femaleName;
  }

  async americanFemaleNameLength() {
    const nameLength = await AmericanFemaleName.countDocuments();

    return nameLength;
  }

  async getAmericanCityName(index) {
    const city = await AmericanCity.findOne({ index });

    return city;
  }

  async americanCityLength() {
    const cityLength = await AmericanCity.countDocuments();

    return cityLength;
  }

  async getAmericanStreetName(index) {
    const street = await AmericanStreet.findOne({ index });

    return street;
  }

  async americanStreetLength() {
    const streetLength = await AmericanStreet.countDocuments();

    return streetLength;
  }

  async getGermanSurname(index) {
    const surname = await GermanSurname.findOne({ index });

    return surname;
  }

  async germanSurnameLength() {
    const surnameLength = await GermanSurname.countDocuments({});

    return surnameLength;
  }

  async getGermanMaleName(index) {
    const maleName = await GermanMaleName.findOne({ index });

    return maleName;
  }

  async germanMaleNameLength() {
    const nameLength = await GermanMaleName.countDocuments();

    return nameLength;
  }

  async getGermanFemaleName(index) {
    const femaleName = await GermanFemaleName.findOne({ index });

    return femaleName;
  }

  async germanFemaleNameLength() {
    const nameLength = await GermanFemaleName.countDocuments();

    return nameLength;
  }

  async getGermanCityName(index) {
    const city = await GermanCity.findOne({ index });

    return city;
  }

  async germanCityLength() {
    const cityLength = await GermanCity.countDocuments();

    return cityLength;
  }

  async getGermanStreetName(index) {
    const street = await GermanStreet.findOne({ index });

    return street;
  }

  async germanStreetLength() {
    const streetLength = await GermanStreet.countDocuments();

    return streetLength;
  }
}

export default new User();
