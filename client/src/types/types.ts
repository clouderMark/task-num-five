export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface IReq {
  region: ERegion;
  errors: number;
  seed: number;
}

interface IName {
  name: string;
  surname: string;
}

interface IAdress {
  city: string;
  street: string;
  house: string;
}

export interface IUser extends IName, IAdress {
  id: string;
  phone: number;

}

export interface ICell {
  field: string;
  value: string;
}

export enum ERegion {
  RANDOM,
  USA,
  RUSSIA,
  POLAND,
}
