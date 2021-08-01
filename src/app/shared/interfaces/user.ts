import { ICar } from './car';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  rentedId: string;
  offered: ICar[];
  accessToken: string | any;
}
