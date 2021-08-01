export interface IUser {
  _id: string;
  email: string;
  name: string;
  rentedId: string;
  offeredId: string[];
  accessToken: string | any;
}
