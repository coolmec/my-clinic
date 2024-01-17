import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Consultation} from '../../models/consultation.model';

@Component({
  selector: 'app-nouvelle-consultation',
  templateUrl: './nouvelle-consultation.component.html',
  styleUrls: ['./nouvelle-consultation.component.scss']
})
export class NouvelleConsultationComponent implements OnInit {

  public editableRow: Consultation;
  public saveButtonClicked: Subject<Consultation> = new Subject<Consultation>();

  public form: UntypedFormGroup = new UntypedFormGroup({
    // id: new FormControl({value: '', disabled: true}),
    codeCons: new UntypedFormControl('', Validators.required),
    designation: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
    type: new UntypedFormControl('', Validators.required),
    tarifNor: new UntypedFormControl('', Validators.required),
    tarifAss: new UntypedFormControl(''),
    dureeValidite: new UntypedFormControl('')
  });

  constructor(public modalRef: MDBModalRef) {
  }

  get codeCons(): AbstractControl {
    return this.form.get('codeCons');
  }

  get designation(): AbstractControl {
    return this.form.get('designation');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get type(): AbstractControl {
    return this.form.get('type');
  }

  get tarifNor(): AbstractControl {
    return this.form.get('tarifNor');
  }

  get tarifAss(): AbstractControl {
    return this.form.get('tarifAss');
  }
  get dureeValidite(): AbstractControl {
    return this.form.get('dureeValidite');
  }

  ngOnInit(): void {
    // this.form.controls.id.patchValue(this.editableRow.id);
    if (this.editableRow) {
      this.form.controls.codeCons.patchValue(this.editableRow.codeCons);
      this.form.controls.designation.patchValue(this.editableRow.designation);
      this.form.controls.description.patchValue(this.editableRow.description);
      this.form.controls.tarifNor.patchValue(this.editableRow.tarifNor);
      this.form.controls.tarifAss.patchValue(this.editableRow.tarifAss);
      this.form.controls.type.patchValue(this.editableRow.type);
      this.form.controls.dureeValidite.patchValue(this.editableRow.dureeValidite);
    }
  }

  editRow(): void {
    this.editableRow = Object.assign({}, this.editableRow, this.form.value);
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }
}
