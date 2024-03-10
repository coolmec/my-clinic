import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModalRef from ng-bootstrap
import { Consultation } from '../../models/consultation.model';

@Component({
  selector: 'app-nouvelle-consultation',
  templateUrl: './nouvelle-consultation.component.html',
  styleUrls: ['./nouvelle-consultation.component.scss']
})
export class NouvelleConsultationComponent implements OnInit {

  public editableRow: Consultation;
  public saveButtonClicked: Subject<Consultation> = new Subject<Consultation>();

  public form: FormGroup = new FormGroup({
    codeCons: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    tarifNor: new FormControl('', Validators.required),
    tarifAss: new FormControl(''),
    dureeValidite: new FormControl('')
  });

  constructor(public modalRef: NgbModalRef) {
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
    if (this.editableRow) {
      this.form.patchValue(this.editableRow);
    }
  }

  editRow(): void {
    this.editableRow = { ...this.editableRow, ...this.form.value };
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.dismiss(); // Use dismiss() to close the modal
  }
}
