import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarListComponent,
    CarDetailsComponent,
    AddCarComponent,
    EditCarComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],

  exports: [
    CarListComponent,
    AddCarComponent,
    CarDetailsComponent,
    EditCarComponent,
  ],
})
export class CarModuleModule {}
