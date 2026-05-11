import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
notifications: string[];

  constructor() {
    this.notifications = [
      'You have unread messages',
      'people reacting to your post',
      'hamada sent you a friend request',
      '',
      'post shared successfully',
    ];
  }

  getInitialNotifications(): string[] {
    return this.notifications;
  }

getNotifications() : Observable<string> {
  return new  Observable<string>((observer) => {
    // observer.next()
    // observer.error()
    // observer.complete()
    let counter = 0;
  let notificationInterval =   setInterval(() => {
      if (counter == this.notifications.length) {
        observer.complete();
      }

      if (this.notifications[counter] == "") {
        observer.error("this Notiftion is Empty");
      }

      observer.next(this.notifications[counter]);
      counter++;
    }, 2000);
    return {
  unsubscribe: () => {
    clearInterval(notificationInterval)
   }
  }
  });
}
 
}
