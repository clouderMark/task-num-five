// import { User as UserMapping } from '../models/mapping.js';
import AppError from '../errors/AppError.js';

class User {
  // async getAll() {
  //   const users = await UserMapping.find({});
  //   return users;
  // }
  async getAll() {
    const users = await UserMapping.find({});
    return users;
  }
}

export default new User();
