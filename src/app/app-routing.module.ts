import { RouterModule, Routes } from '@angular/router';
import { AddCarComponent } from './car-module/add-car/add-car.component';
import { CarDetailsComponent } from './car-module/car-details/car-details.component';
import { CarListComponent } from './car-module/car-list/car-list.component';
import { EditCarComponent } from './car-module/edit-car/edit-car.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'cars',
    component: CarListComponent,
  },
  {
    path: 'add-car',
    component: AddCarComponent,
  },
  {
    path: 'edit-car/:id',
    component: EditCarComponent,
  },
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
