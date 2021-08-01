import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { UserService } from './services/user.service';
import { UserModule } from './user/user.module';
import { CarModuleModule } from './car-module/car-module.module';
import { CarService } from './services/car.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CarModuleModule,
    HttpClientModule,
    UserModule,
    FontAwesomeModule,
  ],
  providers: [CarService, UserService],
  bootstrap: [AppComponent, FooterComponent, HeaderComponent],
})
export class AppModule {}
