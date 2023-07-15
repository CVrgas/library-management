import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/service/DataService/data-service.service';

@Component({
  selector: 'app-offline-alert',
  templateUrl: './offline-alert.component.html',
  styleUrls: ['./offline-alert.component.css'],
})
export class OfflineAlertComponent {
  constructor(private dataService: DataService) {}

  OfflineStatus(state: boolean) {
    this.dataService.changeOffileStatus(state);
    this.dataService.ShowAlert();
  }

  CloseAlert() {
    this.dataService.ShowAlert();
  }
}
