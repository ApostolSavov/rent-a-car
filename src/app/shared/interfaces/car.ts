export interface ICar {
  _id: string;
  rentEnd: Date;
  renterId: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  description: string;
  imageUrl: string;
  ownerId: string;
}
