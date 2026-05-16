import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../../Services/user-auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.fb.array([this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])]),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      addresses: this.fb.array([this.newAddress()]) 
    }, { validators: this.passwordMatchValidator });
  }

  newAddress(): FormGroup {
    return this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]]
    });
  }

  addAddress() {
    this.addresses.push(this.newAddress());
  }

  removeAddress(index: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  addPhone() {
    this.phoneNumbers.push(this.fb.control('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]));
  }

  removePhone(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get f() { return this.registerForm.controls; }
  get addresses() { return (this.registerForm.get('addresses') as FormArray); }
  get phoneNumbers() { return (this.registerForm.get('phoneNumbers') as FormArray); }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration Successful:', response);
          alert('Registration Successful! Welcome ' + response.firstName);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration Error:', err);
          alert('Registration Failed: ' + (err.error?.message || 'Server Error'));
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
