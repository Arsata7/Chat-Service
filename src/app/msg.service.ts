import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  private msgSubject = new Subject<any>();
  public msgObservable$;

  constructor() {
    this.msgObservable$ = this.msgSubject as Observable<any>;
  }

  sendMessage(message: any) {
    this.msgSubject.next(message);
  }

  receivedMessage(): Observable<any> {
    return this.msgSubject.asObservable();
  }
}
