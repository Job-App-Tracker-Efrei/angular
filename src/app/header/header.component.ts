import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { LOGIN } from '@constants/routes';

import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([LOGIN]);
  }
}
