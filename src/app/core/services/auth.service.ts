import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly auth: AngularFireAuth) {}

  private async authLogin(provider: GoogleAuthProvider): Promise<User> {
    const { user } = await this.auth
      .signInWithPopup(provider)
      .catch((error) => {
        throw new Error(error);
      });
    return user as User;
  }

  async loginWithGoogle(): Promise<User> {
    return await this.authLogin(new GoogleAuthProvider());
  }

  async register(email: string, password: string): Promise<User> {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user as User);
  }

  async login(email: string, password: string): Promise<User> {
    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user as User);
  }

  async logout() {
    return await this.auth.signOut();
  }
}
