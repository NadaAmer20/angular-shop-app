import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;
  private baseUrl = 'https://dummyjson.com/users'; // Standard dummy API for users

  constructor(private http: HttpClient) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  get isUserLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, userData);
  }

  login(email: string, password: string) {
    // In a real app, this would be an HTTP call
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
