import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../Services/notification';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().subscribe({
      next: (notification) => {
        console.log(notification);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("notification completed successfully");
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log("Unsubscribed from notifications");
    }
  }
}
