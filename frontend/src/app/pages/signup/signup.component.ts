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
  // نموذج التحقق من المدخلات باستخدام FormBuilder
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
    // التحقق من تطابق كلمة المرور مع تأكيد كلمة المرور
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      this.errorMessage = 'كلمة المرور غير متطابقة';
      return;
    }

    const { name, email, password } = this.signupForm.value;

    // التأكد من أن القيم غير فارغة
    if (!name || !email || !password) {
      this.errorMessage = 'من فضلك قم بتعبئة جميع الحقول';
      return;
    }

    this.authService.signup(name, email, password).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // إعادة التوجيه إلى صفحة الدخول بعد التسجيل الناجح
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقًا'; // إظهار رسالة الخطأ
      },
    });
  }
}
