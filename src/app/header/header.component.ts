import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { AuthService } from '@core/auth.service';
import { UserService } from '@core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
