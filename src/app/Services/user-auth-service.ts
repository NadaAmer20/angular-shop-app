import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  isUserLogged: boolean = false;
  constructor() {}

  login() {
    localStorage.setItem('token', 'true');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUserLogged():Boolean {
    return localStorage.getItem('token') ? true : false;
  }
}