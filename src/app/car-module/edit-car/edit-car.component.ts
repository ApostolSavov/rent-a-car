import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { ICar } from 'src/app/shared/interfaces/car';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent implements OnInit {
  carId!: string;
  car!: ICar;
  initialData!: object;
  form!: FormGroup;
  brandList!: Array<string>;
  modelList!: Array<string>;

  private sub: any;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['testtest', [Validators.required, Validators.minLength(5)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
    });
  }

  ngOnInit(): void {
    this.modelList = [];
    this.carService.loadBrands().subscribe((x) => {
      this.brandList = x;
    });

    this.route.params.subscribe((x) => {
      this.carId = x.id;

      this.carService.getCar(this.carId).subscribe((x) => {
        this.car = x;

        this.carService.loadModels(x.brand).subscribe((x) => {
          this.modelList = x;
        });

        this.form.patchValue({
          brand: x.brand,
          model: x.model,
          year: x.year,
          price: x.price,
          description: x.description,
          imageUrl: x.imageUrl,
        });
      });
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
      .editCar(this.carId, {
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
