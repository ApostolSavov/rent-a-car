import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces/user';
const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: IUser | any;
  get email(): string {
    return this.user.email;
  }
  get userId(): string {
    return sessionStorage.getItem('userId') || '';
  }
  get userInfo(): IUser {
    return this.user;
  }
  get isLogged(): boolean {
    return JSON.parse(sessionStorage.getItem('isLogged') || 'false');
  }
  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<IUser> {
    return this.http
      .get<IUser>(`${apiURL}/auth/user/${userId}`, { withCredentials: false })
      .pipe(
        tap((x) => {
          this.user = x;
        })
      );
  }

  login(body: Object): Observable<IUser> {
    return this.http
      .post<IUser>(`${apiURL}/auth/login`, body, { withCredentials: false })
      .pipe(
        tap((x) => {
          this.user = x;
          sessionStorage.setItem('isLogged', 'true');
          sessionStorage.setItem('userId', String(x._id));
          sessionStorage.setItem('email', String(x.email));
          sessionStorage.setItem('accessToken', String(x.accessToken));
        })
      );
  }
  register(body: Object): Observable<IUser> {
    return this.http
      .post<IUser>(`${apiURL}/auth/register`, body, {
        withCredentials: false,
      })
      .pipe(
        tap((x) => {
          console.log('in pipe');
          this.user = x;
          sessionStorage.setItem('isLogged', 'true');
          sessionStorage.setItem('userId', String(x._id));
          sessionStorage.setItem('email', String(x.email));
          sessionStorage.setItem('accessToken', String(x.accessToken));
        })
      );
  }
  logout(): any {
    sessionStorage.setItem('isLogged', 'false');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
    this.user = null;
    return this.http.post(
      `${apiURL}/auth/logout`,
      {},
      { withCredentials: false }
    );
  }
}
