import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  location!: any;
  user!: any;

  private locSub: any;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private userService: UserService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.locSub = this.utilService.getLocation().subscribe((x) => {
      this.location = x;
    });
  }

  ngOnDestroy() {
    this.locSub.unsubscribe();
  }
}
