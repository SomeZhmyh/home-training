import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterModel } from '../_models/RegisterModel';
import { ConfirmModel } from '../_models/ConfirmModel';
const AUTH_API = 'https://localhost:7186';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(model: RegisterModel): Observable<any> {
    return this.http.post(
      'https://localhost:7186/register',
      model
    );
  }
  confirm(register: ConfirmModel): Observable<any> {
    return this.http.post(
      'https://localhost:7186/confirmEmail',
      register
    );
  }
}
