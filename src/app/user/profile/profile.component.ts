import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { ICar } from 'src/app/shared/interfaces/car';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: IUser;
  rented!: ICar;
  offered!: Array<ICar>;

  private userSub: any;
  private rentedSub: any;

  constructor(
    private userService: UserService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService
      .getUser(this.userService.userId)
      .subscribe((x) => {
        console.log(x);
        this.user = x;

        if (x.rentedId) {
          this.rentedSub = this.carService.getCar(x.rentedId).subscribe((x) => {
            console.log(x);
            this.rented = x;
          });
        }

        console.log('rented', this.rented);

        this.offered = x.offered;

        console.log('offered', this.offered);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.rentedSub) {
      this.rentedSub.unsubscribe();
    }
  }
}
