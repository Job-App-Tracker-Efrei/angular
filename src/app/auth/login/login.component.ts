import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { HOME } from '@constants/routes';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate([HOME]);
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return alert('Please fill all fields');

    this.authService
      .login(email, password)
      .then(() => {
        this.router.navigate([HOME]);
      })
      .catch(() => {
        alert('Invalid email or password');
      });
  }
}
