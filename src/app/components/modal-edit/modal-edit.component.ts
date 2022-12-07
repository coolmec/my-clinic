import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Patient} from '../../models/patient.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  public editableRow: Patient;
  public saveButtonClicked: Subject<Patient> = new Subject<Patient>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    tel1: new FormControl('', Validators.required),
    tel2: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(public modalRef: MDBModalRef) {
  }

  get nom(): AbstractControl {
    return this.form.get('nom');
  }

  get prenom(): AbstractControl {
    return this.form.get('prenom');
  }

  get tel1(): AbstractControl {
    return this.form.get('tel1');
  }

  get tel2(): AbstractControl {
    return this.form.get('tel2');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.nom.patchValue(this.editableRow.nom);
    this.form.controls.prenom.patchValue(this.editableRow.prenom);
    this.form.controls.tel1.patchValue(this.editableRow.tel1);
    this.form.controls.tel2.patchValue(this.editableRow.tel2);
    this.form.controls.email.patchValue(this.editableRow.email);
  }

  editRow(): void {
    this.editableRow = Object.assign({}, this.editableRow, this.form.value);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }
}
