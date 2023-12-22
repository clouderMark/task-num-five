import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const nameSchema = new Schema({
  name: { type: String, unique: true, required: true },
  index: { type: Number, unique: true, require: true },
});

const Surname = mongoose.model('Surname', nameSchema);
const MaleName = mongoose.model('MaleName', nameSchema);
const FemaleName = mongoose.model('FemaleName', nameSchema);
const City = mongoose.model('City', nameSchema);
const Street = mongoose.model('Street', nameSchema);

const AmericanSurname = mongoose.model('AmericanSurname', nameSchema);
const AmericanMaleName = mongoose.model('AmericanMaleName', nameSchema);
const AmericanFemaleName = mongoose.model('AmericanFemaleName', nameSchema);
const AmericanCity = mongoose.model('AmericanCity', nameSchema);
const AmericanStreet = mongoose.model('AmericanStreet', nameSchema);

const GermanSurname = mongoose.model('GermanSurname', nameSchema);
const GermanMaleName = mongoose.model('GermanMaleName', nameSchema);
const GermanFemaleName = mongoose.model('GermanFemaleName', nameSchema);
const GermanCity = mongoose.model('GermanCity', nameSchema);
const GermanStreet = mongoose.model('GermanStreet', nameSchema);

export {
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
};
