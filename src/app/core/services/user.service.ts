import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class UserService {
  constructor(private readonly auth: AngularFireAuth) {}

  async getCurrentUser(): Promise<User | null> {
    return await this.auth.currentUser.then((user) => {
      if (user) return user as User;
      else return null;
    });
  }

  async updateCurrentUser(user: {
    displayName?: string;
    photoURL?: string;
  }): Promise<User> {
    return await this.auth.currentUser.then(async (currentUser) => {
      if (currentUser) {
        return await currentUser
          .updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
          .then(() => currentUser as User);
      } else {
        throw new Error('No user logged in');
      }
    });
  }
}
