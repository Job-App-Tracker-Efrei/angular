import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
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

  loginWithGoogle(): Promise<User> {
    return this.authLogin(new GoogleAuthProvider());
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

  logout() {
    return this.auth.signOut();
  }
}
