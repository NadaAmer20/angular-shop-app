import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;

  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  get isUserLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  login(email: string, password: string) {
    const token = 'ABC-XYZ-123';  
    localStorage.setItem('token', token);
    this.isLoggedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }

  getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }
}
