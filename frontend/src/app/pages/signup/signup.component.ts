import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  // FormBuilder to render the form and verify
  signupForm;

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSignup() {
    //  check the password is correct (is the same)?
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      this.errorMessage = " Password don't match ";
      return;
    }

    const { name, email, password } = this.signupForm.value;

    if (!name || !email || !password) {
      this.errorMessage = 'Please enter All Fields';
      return;
    }

    this.authService.signup(name, email, password).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // redirect to login page after successful Signup
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage =
          ' an error occurred while signing up , please try again';
      },
    });
  }
}
