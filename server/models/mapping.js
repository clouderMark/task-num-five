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

export { Surname, MaleName, FemaleName, City, Street };
