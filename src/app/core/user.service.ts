import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class UserService {
  constructor(private readonly auth: AngularFireAuth) {}

  getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) resolve(user as User);
        else reject(new Error('No user logged in'));
      });
    });
  }

  updateCurrentUser(user: {
    displayName?: string;
    photoURL?: string;
  }): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.auth.currentUser.then((currentUser) => {
        if (currentUser) {
          currentUser
            .updateProfile({
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
            .then(() => resolve(currentUser as User))
            .catch((error) => reject(new Error(error)));
        } else {
          throw new Error('No user logged in');
        }
      });
    });
  }
}
