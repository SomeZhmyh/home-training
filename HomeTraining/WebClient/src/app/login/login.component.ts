import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CookieService } from '../_services/cookie.service';
import { LoginModel } from '../_models/loginModel';
import { AuthReponseModel } from '../_models/authResponseModel'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginModel = { username: "", password: "" };

;
  data: AuthReponseModel = {
      id: "",
      name: "",
      surname: "",
      midname: "",
      username: "",
      password: "",
      token: "",
      roles: []
  } ;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private _authService: AuthService, private _cookieService: CookieService) { }

  ngOnInit(): void {
    if (this._cookieService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this._cookieService.getUser().roles;
      this.data = this._cookieService.getUser();
    }
  }
  onSubmit(): void {
    this._authService.login(this.form).subscribe(
      data => {
        this.data = data;
        this._cookieService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this._cookieService.getUser().roles;
        window.location.reload();;
        console.log("logged as " + data.name);
        console.log(data);
      });

    
  }

  logout(): void {
    this._authService.logout();
  }
}
