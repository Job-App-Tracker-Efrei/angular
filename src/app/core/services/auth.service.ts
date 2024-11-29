import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

import { isValidEmail } from '@utils/checkData/isValidEmail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly attemptsCollection = 'loginAttempts';

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly toastr: ToastrService,
  ) {}

  private async isBlocked(email: string): Promise<boolean> {
    const attemptDoc = await firstValueFrom(
      this.firestore.collection(this.attemptsCollection).doc(email).get(),
    );

    if (!attemptDoc.exists) return false;

    const { blockUntil, count } = attemptDoc.data() as {
      blockUntil: Timestamp;
      count: number;
    };
    if (count >= 3) {
      const now = Timestamp.now();

      if (blockUntil && now.toMillis() < blockUntil.toMillis()) {
        const waitTime = Math.ceil(
          (blockUntil.toMillis() - now.toMillis()) / 1000,
        );
        this.toastr.error(
          `Account is locked. Try again in ${waitTime} seconds.`,
        );
        return true;
      }
    }

    return false;
  }

  private async recordFailedAttempt(email: string): Promise<void> {
    const attemptRef = this.firestore
      .collection(this.attemptsCollection)
      .doc(email);

    const attemptDoc = await firstValueFrom(attemptRef.get());
    const now = Timestamp.now();

    if (!attemptDoc.exists) {
      await attemptRef.set({ count: 1, blockUntil: now });
    } else {
      const { count } = attemptDoc.data() as {
        count: number;
        blockUntil: Timestamp;
      };
      const newCount = count + 1;
      const blockTimeMillis = Math.pow(2, newCount) * 60 * 1000; // Exponential backoff

      await attemptRef.update({
        count: newCount,
        blockUntil: Timestamp.fromMillis(now.toMillis() + blockTimeMillis),
      });

      if (count <= 3) return;
      this.toastr.error(
        `Account locked for ${blockTimeMillis / 1000} seconds.`,
      );
    }
  }

  private async resetAttempts(email: string): Promise<void> {
    const attemptRef = this.firestore
      .collection(this.attemptsCollection)
      .doc(email);
    await attemptRef.delete();
  }

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

    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => user as User);
  }

  async login(email: string, password: string): Promise<User | void> {
    if (!this.checkCredentials(email, password)) return;

    if (await this.isBlocked(email)) return;

    try {
      const user = await this.auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => data.user as User);
      await this.resetAttempts(email);
      return user;
    } catch {
      await this.recordFailedAttempt(email);
      this.toastr.error('Invalid credentials');
    }
  }

  async logout() {
    return await this.auth.signOut();
  }
}
