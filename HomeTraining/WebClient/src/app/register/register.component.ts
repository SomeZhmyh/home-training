import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { RegisterModel } from '../_models/registerModel'
import { RoleModel } from '../_models/roleModel';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: RoleModel[] = [];
  @Input() selected: RoleModel;
  renderFunction = (item: RoleModel) => { return `${item.name}`; }
  form: RegisterModel = {
    email: "",
    username: "",
    password: "",
    confirmCode: 0
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private _authService: AuthService) { }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this._authService.register(this.form).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err;
        this.isSignUpFailed = true;
      }
    });
  }
  confirm() {
    this._authService.confirm(this.form).subscribe(res => {
      alert('pat pat');
    },
      error => {
        alert('not pat pat');
      }
    )
  }
}
