import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../../shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  private sub: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePass: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'rePass'),
      }
    );
  }

  onRegister(): void {
    const { email, name, password, rePass } = this.form.value;
    this.sub = this.userService
      .register({
        email,
        name,
        password: password,
        rePassword: rePass,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cars']);
          this.sub.unsubscribe();
        },
        error: (error) => {
          console.log(error.message);
          alert('Registration failed');
          this.sub.unsubscribe();
        },
      });
  }
}
