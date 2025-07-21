import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPageComponent {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        department: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator para la contraseña
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    if (!valid) {
      return { passwordStrength: true };
    }
    return null;
  }

  // Custom validator para confirmar contraseña
  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simular llamada a API
      setTimeout(() => {
        const formData = this.registerForm.value;
        delete formData.confirmPassword; // No enviar confirmPassword al backend
        delete formData.acceptTerms; // No enviar acceptTerms al backend

        // Aquí iría tu lógica de registro
        console.log('Register attempt:', formData);

        // Simular respuesta exitosa
        this.isLoading = false;
        this.successMessage = 'Cuenta creada exitosamente. Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Getters para fácil acceso a los controles del formulario
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get department() {
    return this.registerForm.get('department');
  }
  get acceptTerms() {
    return this.registerForm.get('acceptTerms');
  }

  // Departamentos disponibles
  departments = [
    { value: 'it', label: 'Tecnología de la Información' },
    { value: 'hr', label: 'Recursos Humanos' },
    { value: 'finance', label: 'Finanzas' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operaciones' },
    { value: 'sales', label: 'Ventas' },
    { value: 'support', label: 'Soporte' },
    { value: 'admin', label: 'Administración' },
  ];
}
