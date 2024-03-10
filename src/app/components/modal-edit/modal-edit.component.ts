import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  @Input() editableRow: Patient;
  public saveButtonClicked: Subject<Patient> = new Subject<Patient>();

  public form: FormGroup;

  constructor(public modalRef: NgbModalRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
    this.patchFormValues();
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [{ value: this.editableRow.id, disabled: true }],
      nom: [this.editableRow.nom, Validators.required],
      prenom: [this.editableRow.prenom, Validators.required],
      tel1: [this.editableRow.tel1, Validators.required],
      tel2: [this.editableRow.tel2, Validators.required],
      email: [this.editableRow.email, Validators.email]
    });
  }

  patchFormValues(): void {
    // You can use setValue() to set values for all controls at once
    // or patchValue() to set values for specific controls
    this.form.patchValue({
      nom: this.editableRow.nom,
      prenom: this.editableRow.prenom,
      tel1: this.editableRow.tel1,
      tel2: this.editableRow.tel2,
      email: this.editableRow.email
    });
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

  editRow(): void {
    if (this.form.valid) {
      const updatedPatient: Patient = Object.assign({}, this.editableRow, this.form.value);
      this.saveButtonClicked.next(updatedPatient);
      this.modalRef.close();
    }
  }
}
