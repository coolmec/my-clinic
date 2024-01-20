import { Component } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent {

  public title = 'Confirmation';
  public deleteButtonClicked: Subject<any> = new Subject<any>();

  constructor(public modalRef: NgbModalRef) {
  }

  deletePatient(): void {
    this.deleteButtonClicked.next('');
    this.modalRef.close();
  }
}
