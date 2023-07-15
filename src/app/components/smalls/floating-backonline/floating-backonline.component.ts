import { Component } from '@angular/core';
import { DataService } from 'src/app/service/DataService/data-service.service';

@Component({
  selector: 'app-floating-backonline',
  templateUrl: './floating-backonline.component.html',
  styleUrls: ['./floating-backonline.component.css'],
})
export class FloatingBackonlineComponent {
  constructor(private dataService: DataService) {
    dataService.currentOStatus.subscribe(
      (CurrentStatus) => (this.status = CurrentStatus)
    );
  }
  status: Boolean;
  disable() {
    this.dataService.changeOffileStatus(false);
  }
}
