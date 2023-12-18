import mongoose from 'mongoose';
// import { recordDataToDb } from './recordDataToDb';

const Schema = mongoose.Schema;

const nameSchema = new Schema({
  name: { type: String, unique: true, required: true },
  index: { type: Number, unique: true, require: true },
});

const Surname = mongoose.model('Surname', nameSchema);
const MaleName = mongoose.model('MaleName', nameSchema);
const FemaleName = mongoose.model('FemaleName', nameSchema);

export { Surname, MaleName, FemaleName };

// recordDataToDb();
