import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ content: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getSubject(): Observable<any> {
    return this.subject.asObservable();
  }

  sendGameweekNumber(gwNumber: number) {
    this.subject.next({ gameweek: gwNumber });
  }

}
