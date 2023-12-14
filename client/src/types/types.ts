export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface IReq {
  region: string;
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
