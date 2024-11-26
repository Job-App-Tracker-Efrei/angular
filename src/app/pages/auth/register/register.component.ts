import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { HOME, LOGIN } from '@constants/routes';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate([HOME]);
    });
  }

  register() {
    const { email, password } = this.registerForm.value;
    if (!email || !password) return alert('Please fill all fields');

    this.authService.register(email, password).then(() => {
      this.router.navigate([LOGIN]);
    });
  }
}
