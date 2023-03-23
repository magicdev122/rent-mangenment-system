import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
    ) {}

  ngOnInit() {
    this.userService
    .getProfile()
    .subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      return false;
    });
  }

}
