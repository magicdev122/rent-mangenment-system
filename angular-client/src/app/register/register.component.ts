import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  model = new User("", "", "", "", "",);

  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  onRegisterSubmit() {
    this.userService
    .registerUser(this.model)
    .subscribe(res => {
      if(res.success) {
        this.flashMessagesService.show("User registered successfully", { cssClass: 'alert-success', timeout: 2500});
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        this.router.navigate(['/register']);
      }
    });
  }

  ngOnInit() { }
}
