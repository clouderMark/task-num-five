export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface IReq {
  region: number;
  errors: number;
  seed: number;
}

export interface IUser {
  number: string;
  id: string;
  name: string;
  address: string;
  phone: number;
}

export interface ICell {
  field: string;
  value: string;
}
