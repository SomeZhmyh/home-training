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
export class UserService {
  constructor(private http: HttpClient) { }

  login(login: LoginModel): Observable<any> {

    return this.http.post(
      'https://localhost:7186/login',
      login,
      httpOptions
    );
  }
  register(register: RegisterModel): Observable<any> {
    return this.http.post(
      'https://localhost:7186/register',
      register,
      httpOptions
    );
  }
  getRoles(): Observable<any> {
    return this.http.get<RoleModel[]>(AUTH_API + '/roles');
  }
  logout(): Observable<any> {
    sessionStorage.removeItem("auth-user");
    return this.http.post(AUTH_API + '/signout', {}, httpOptions);
  }
}
