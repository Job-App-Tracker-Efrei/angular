import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
      console.log('ok');
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) return alert('Please fill all fields');

    this.authService.login(email, password).then(() => {
      // this.router.navigate(['']);
      console.log('ok');
    });
  }
}
