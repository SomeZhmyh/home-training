import { Component, OnInit } from '@angular/core';
import { CookieService } from '../_services/cookie.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  constructor(private cookieService: CookieService) { }
  ngOnInit(): void {
    this.currentUser = this.cookieService.getUser();
  }
}
