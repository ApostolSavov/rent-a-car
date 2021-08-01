import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICar } from '../shared/interfaces/car';

import { environment } from '../../environments/environment';
const apiURL = environment.apiURL;

@Injectable()
export class CarService {
  constructor(private http: HttpClient) {}

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
  editCar(body: Object): Observable<ICar> {
    return this.http.post<ICar>(`${apiURL}/data`, body, {
      withCredentials: false,
    });
  }
  deleteCar(id: string): Observable<ICar> {
    return this.http.post<ICar>(`${apiURL}/data/${id}`, {
      withCredentials: false,
    });
  }
  rentCar(userId: string, carId: string, days: number): Observable<any> {
    return this.http.post<any>(`${apiURL}/data/${carId}/rental`, {
      userId,
      carId,
      days,
    });
  }
}
