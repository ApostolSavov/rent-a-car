import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent implements OnInit {
  carId!: string;
  form!: FormGroup;
  brandList!: Array<string>;
  modelList!: Array<string>;

  private sub: any;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
    });
  }

  printShit(): void {
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.modelList = [];
    this.carService.loadBrands().subscribe((x) => {
      this.brandList = x;
    });
  }

  changeBrand(event: any): void {
    this.carService.loadModels(event.target.value).subscribe((x) => {
      this.modelList = x;
    });
  }

  onSubmit(): void {
    const { brand, model, year, price, description, imageUrl } =
      this.form.value;
    this.sub = this.carService
      .addCar({
        brand,
        model,
        year: Number(year),
        price: Number(price),
        description,
        imageUrl,
        ownerId: this.userService.userId,
      })
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/cars');
          this.sub.unsubscribe();
        },
        error: (error) => {
          alert('Editing failed');
          this.sub.unsubscribe();
        },
      });
  }
}
