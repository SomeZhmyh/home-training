import { Component, OnInit } from '@angular/core';
import { ConfirmModel } from '../_models/ConfirmModel';
import { RegisterModel } from '../_models/RegisterModel';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login: string = "";
  email: string = "";
  password: string = "";
  code: number = 0;
  isNeedToConfirm: boolean = false;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  register(): void {
    let model: RegisterModel = {
      Username: this.login,
      Email: this.email,
      Password: this.password
    }
    this._authService.register(model).subscribe(() => {
      console.log('Registered')
    });
    this.isNeedToConfirm = true;
  }

  confirm(): void {
    let model: ConfirmModel = {
      ConfirmCode: this.code,
      Email: this.email,
      Password: this.password
    }
    this._authService.confirm(model).subscribe(() => {
      console.log('Email confirmed');
      alert('Email confirmed');
    });
  }
}
