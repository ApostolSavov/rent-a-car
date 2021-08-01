import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICar } from '../../shared/interfaces/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {
  private sub: any;

  carList!: ICar[];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.sub = this.carService
      .loadCars()
      .pipe<ICar[]>(
        map((x) => {
          return x.sort((a: ICar, b: ICar) => b.year - a.year);
        })
      )
      .subscribe((cars: ICar[]) => (this.carList = cars));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
