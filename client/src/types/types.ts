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
  to: number;
  from: number;
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
  phone: string;
}

export interface ICell {
  field: string;
  value: string;
}

export enum ERegion {
  RANDOM,
  USA,
  RUSSIA,
  GERMAN,
}

export enum USER {
  AMOUNT = 10,
}
