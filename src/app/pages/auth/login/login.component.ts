import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HOME } from '@constants/routes';

import { emailValidator } from '@validators/email.validator';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate([HOME]);
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid) {
      this.toastr.error('Please fill all fields');
      return;
    }

    this.authService
      .login(email, password)
      .then((user) => {
        if (!user) return;
        this.toastr.success('Logged in successfully');
        this.router.navigate([HOME]);
      })
      .catch(() => {
        this.toastr.error('Invalid email or password');
      });
  }
}
