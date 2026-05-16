import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCount } from '../../Store/Counter/counter.reducer';
import { CounterActions } from '../../Store/Counter/counter.actions';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../Services/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private store = inject(Store);

  private subscription: Subscription | undefined;
  private storeSub: Subscription | undefined;
  count: number = 0;

  constructor() {
    this.storeSub = this.store.select(selectCount).subscribe((newVal) => {
      this.count = newVal;
    });
  }

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
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    console.log("Unsubscribed from all");
  }

  plus() {
    this.store.dispatch(CounterActions.increment());
  }

  minus() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
  }
}
