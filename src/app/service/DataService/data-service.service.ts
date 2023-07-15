import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private OfflineStatus = new BehaviorSubject<Boolean>(false);
  currentOStatus = this.OfflineStatus.asObservable();

  private ShowOfflineAlert = new BehaviorSubject<Boolean>(false);
  currentShowAlert = this.ShowOfflineAlert.asObservable();

  changeOffileStatus(newStatus: Boolean) {
    this.OfflineStatus.next(newStatus);
  }
  ShowAlert() {
    this.ShowOfflineAlert.next(!this.ShowOfflineAlert.value);
  }
}
