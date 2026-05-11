import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/user-auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: UserAuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedStatus().subscribe(status => {
      this.isLogged = status;
    });
  }

  login() {
    this.authService.login('admin@test.com', '123456');
    console.log('User Logged In');
  }

  logout() {
    this.authService.logout();
    console.log('User Logged Out');
  }
}
