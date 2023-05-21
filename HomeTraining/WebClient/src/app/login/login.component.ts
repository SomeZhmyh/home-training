import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { LoginModel } from '../_models/loginModel'
import { AuthReponseModel } from '../_models/AuthResponseModel'

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
  constructor(private _authService: UserService, private _storageService: StorageService) { }

  ngOnInit(): void {
    if (this._storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this._storageService.getUser().roles;
      this.data = this._storageService.getUser();
    }
  }
  onSubmit(): void {
    this._authService.login(this.form).subscribe(
      data => {
        this.data = data;
        this._storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this._storageService.getUser().roles;
        window.location.reload();;
        console.log("logged as " + data.name);
        console.log(data);
      });

    
  }

  logout(): void {
    this._authService.logout();
  }
}
