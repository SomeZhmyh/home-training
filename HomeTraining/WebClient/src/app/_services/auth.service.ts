import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../_models/registerModel'
import { LoginModel } from '../_models/loginModel'
import { environment } from '../../environments/environment';
import { RoleModel } from '../_models/roleModel';

const AUTH_API = environment.api_path;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(login: LoginModel): Observable<any> {

    return this.http.post(
      'https://localhost:7186/login', login
    );
  }
  register(register: RegisterModel): Observable<any> {
    return this.http.post(
      'https://localhost:7186/register', register
    );
  }

  logout(): Observable<any> {
    sessionStorage.removeItem("auth-user");
    return this.http.post(AUTH_API + '/signout', {} );
  }

  getRoles(): Observable<any> {
    return this.http.get<RoleModel[]>(AUTH_API + '/roles');
  }
}
