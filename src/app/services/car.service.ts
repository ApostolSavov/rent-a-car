import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from '../shared/interfaces/car';

import { environment } from '../../environments/environment';
const apiURL = environment.apiURL;

@Injectable()
export class CarService {
  constructor(private http: HttpClient) {}

  loadModels(brand: string): Observable<string[]> {
    return this.http.get<string[]>(`${apiURL}/util/${brand}/models`);
  }

  loadBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${apiURL}/util/brands`);
  }

  loadCars(): Observable<ICar[]> {
    return this.http.get<ICar[]>(`${apiURL}/data`, {
      withCredentials: false,
    });
  }
  getCar(id: string): Observable<ICar> {
    return this.http.get<ICar>(`${apiURL}/data/${id}`, {
      withCredentials: false,
    });
  }
  addCar(body: Object): Observable<ICar> {
    return this.http.post<ICar>(`${apiURL}/data`, body, {
      withCredentials: false,
    });
  }
  editCar(carId: string, body: Object): Observable<ICar> {
    return this.http.put<ICar>(`${apiURL}/data/${carId}`, body, {
      withCredentials: false,
    });
  }
  deleteCar(carId: string): Observable<ICar> {
    return this.http.delete<ICar>(`${apiURL}/data/${carId}`);
  }
  rentCar(userId: string, carId: string, days: number): Observable<any> {
    return this.http.post<any>(`${apiURL}/data/${carId}/rental`, {
      userId,
      carId,
      days,
    });
  }
}
