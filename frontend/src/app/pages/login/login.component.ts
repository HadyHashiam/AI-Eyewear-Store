import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent {
  errorMessage: string = '';

  loginForm;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email || '';

    const password = this.loginForm.value.password || '';

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Email or password incorrect ';
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
