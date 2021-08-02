import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from '../../shared/interfaces/car';
import { IUser } from '../../shared/interfaces/user';
import { CarService } from '../../services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  carId!: string;
  car!: ICar;
  user!: IUser;
  selectVal!: number;

  private carSub: any;
  private idSub: any;
  private userSub: any;
  // private rentSub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private userService: UserService
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.userId;
  }

  getSelectVal(event: any): void {
    this.selectVal = Number(event.target.value);
    console.log(this.selectVal);
    console.log(this.car, this.user);
  }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe((x) => (this.carId = x.id));

    this.carSub = this.carService.getCar(this.carId).subscribe((x) => {
      this.car = x;
    });

    this.userSub = this.userService.getUser(this.userId).subscribe((x) => {
      this.user = x;
    });
  }

  onRent(userId: string, carId: string, days: number): void {
    this.carService.rentCar(userId, carId, days).subscribe((x) => {
      console.log(userId, carId, days);
      console.log(x);
      this.router.navigateByUrl('/user/profile');
    });
  }

  onDelete(carId: string): void {
    let action = confirm('Are you sure you want to delete this car offer?');
    if (action) {
      this.carService.deleteCar(carId).subscribe((x) => {
        console.log('redir');
        console.log(x);
        this.router.navigateByUrl('/cars');
      });
    } else {
      return;
    }
  }

  onCancel(carId: string, userId: string): void {
    this.carService.cancelRent(carId, userId).subscribe((x) => {
      console.log(x);
    });
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.carSub.unsubscribe();
    this.userSub.unsubscribe();
    //this.rentSub.unsubscribe();
  }
}
