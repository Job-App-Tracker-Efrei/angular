import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

import { isValidEmail } from '@utils/checkData/isValidEmail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly auth: AngularFireAuth,
    private readonly toastr: ToastrService,
  ) {}

  private async loginWithProvider(provider: GoogleAuthProvider): Promise<User> {
    const { user } = await this.auth
      .signInWithPopup(provider)
      .catch((error) => {
        throw new Error(error);
      });
    return user as User;
  }

  private checkCredentials(email: string, password: string): boolean {
    if (!isValidEmail(email)) {
      this.toastr.error('Invalid email');
      return false;
    }

    if (password.length < 6) {
      this.toastr.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  }

  async loginWithGoogle(): Promise<User> {
    return await this.loginWithProvider(new GoogleAuthProvider());
  }

  async register(email: string, password: string): Promise<User | void> {
    if (!this.checkCredentials(email, password)) return;

    // TODO: check if email is already in use

    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user as User);
  }

  async login(email: string, password: string): Promise<User | void> {
    if (!this.checkCredentials(email, password)) return;

    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user as User);
  }

  async logout() {
    return await this.auth.signOut();
  }
}
