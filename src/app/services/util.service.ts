import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  location!: object;

  constructor(private http: HttpClient) {}

  getLocation(): Observable<object> {
    return this.http.get<object>('https://freegeoip.app/json/').pipe(
      tap((x) => {
        this.location = x;
      })
    );
  }
}
