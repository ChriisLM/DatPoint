import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconsModule } from '../../shared/icons/icons.module';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'dtp-login-page',
  imports: [IconsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      hash_password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Respuesta del backend:', response);
        if (response.success) {
          // Redirige si todo fue bien
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Credenciales inválidas';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un error. Intenta nuevamente.';
        console.error('Error en login:', error);
      }
    });
  } else {
    this.markFormGroupTouched();
  }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Getters para fácil acceso a los controles del formulario
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
