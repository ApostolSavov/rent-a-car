import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  private sub: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    const { email, password } = this.form.value;
    this.sub = this.userService
      .login({
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cars']);
          this.sub.unsubscribe();
        },
        error: (error) => {
          alert('Failed to login');
          this.sub.unsubscribe();
        },
      });
  }
}
