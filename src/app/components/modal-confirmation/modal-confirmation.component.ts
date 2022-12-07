import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent {

  public title = 'Confirmation';
  public deleteButtonClicked: Subject<any> = new Subject<any>();

  constructor(public modalRef: MDBModalRef) {
  }

  deletePatient(): void {
    this.deleteButtonClicked.next('');
    this.modalRef.hide();
  }
}
