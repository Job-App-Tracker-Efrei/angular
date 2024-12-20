import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HOME, LOGIN } from '@constants/routes';

import { emailValidator } from '@validators/email.validator';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        this.router.navigate([HOME]);
      })
      .catch(() => {
        this.toastr.error('Failed to login with Google');
      });
  }

  register() {
    const { email, password, confirmPassword } = this.registerForm.value;
    if (!email || !password || !confirmPassword) {
      this.toastr.error('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    this.authService.register(email, password).then((user) => {
      if (!user) return;
      this.toastr.success('Registered successfully');
      this.router.navigate([LOGIN]);
    });
  }
}
