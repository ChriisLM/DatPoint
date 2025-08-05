import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconsModule } from '../../shared/icons/icons.module';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simular llamada a API
      setTimeout(() => {
        const { email, password } = this.loginForm.value;

        // Aquí iría tu lógica de autenticación
        console.log('Login attempt:', { email, password });

        // Simular respuesta exitosa
        this.isLoading = false;
        this.router.navigate(['/dashboard']); // Redirigir al dashboard
      }, 1500);
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
