import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  public editableRow: { id: string, first: string, last: string, handle: string };
  public saveButtonClicked: Subject<any> = new Subject<any>();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    first: new FormControl('', Validators.required),
    last: new FormControl('', Validators.required),
    handle: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef) {
  }

  get first(): AbstractControl {
    return this.form.get('first');
  }

  get last(): AbstractControl {
    return this.form.get('last');
  }

  get handle(): AbstractControl {
    return this.form.get('handle');
  }

  ngOnInit(): void {
    this.form.controls.id.patchValue(this.editableRow.id);
    this.form.controls.first.patchValue(this.editableRow.first);
    this.form.controls.last.patchValue(this.editableRow.last);
    this.form.controls.handle.patchValue(this.editableRow.handle);
  }

  editRow(): void {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }
}
