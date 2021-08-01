import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  get isLogged(): boolean {
    //console.log(this.userService.isLogged);

    return this.userService.isLogged;
  }
  get email(): string {
    return this.userService.email;
  }

  faCoffee = faCoffee;

  onLogout(): void {
    this.userService.logout();
  }
}
