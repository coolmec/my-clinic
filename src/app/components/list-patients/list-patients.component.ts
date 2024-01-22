import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deletePatient, loadPatients, upsertPatient } from '../../actions/patient.actions';
import { Patient } from '../../models/patient.model';
import { selectPatientsListFeatureState } from '../../reducers';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  providers: [NgbPaginationConfig]
})
export class ListPatientsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('content', { static: true }) content: ElementRef;

  elements: Observable<Patient[]>; // This will be used as an observable of the arraylist of patients
  headElements = ['Id', 'Nom', 'Prénom', 'Tél. 1', 'Tél. 2', 'E-mail', 'Opération']; // Datatable header titles
  nameSearch: string = '';
  surnameSearch: string = '';
  telSearch: string = '';
  previous: string;
  modalRef: NgbModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private store: Store,
  ) {

   }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    // Connection to the store, to get the list of registered patients
    this.store.dispatch(loadPatients());
    // Selection of the downloaded list of registered patients from the store state
    this.elements = this.store.select(selectPatientsListFeatureState);
    // Feeding of the table with the data source
    this.previous = this.elements.toString();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  open(content) {
    this.modalService.open(content, { scrollable: true });
  }

  editRow(el: Patient): void {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'modal-edit',
    };
    this.modalRef = this.modalService.open(ModalEditComponent, modalOptions);
    this.modalRef.componentInstance.editableRow = el;
    this.modalRef.result.then(
      (updatedPatient: Patient) => {
        this.store.dispatch(upsertPatient({ patient: updatedPatient }));
      }
    );
  }

  removeRow(el: Patient): void {
    this.modalRef = this.modalService.open(ModalConfirmationComponent);
    this.modalRef.result.then(
      () => {
        this.store.dispatch(deletePatient({ patient: el }));
      }
    );
  }

  searchItems() {    
    this.elements = this.store.select(selectPatientsListFeatureState).pipe(
      map(data => data.filter(value => this.recherche(value, this.nameSearch, this.surnameSearch, this.telSearch)))
    );
  }

  recherche(data: Patient, nom: string, prenom: string, tel: string): boolean {
    const trimmedNom = nom.trim();
    const trimmedPrenom = prenom.trim();
    const trimmedTel = tel.trim();

    if (trimmedNom === '' && trimmedPrenom === '' && trimmedTel === '') {
      return true;
    }

    const isNomMatch = trimmedNom === '' || data.nom.includes(trimmedNom);
    const isPrenomMatch = trimmedPrenom === '' || data.prenom.includes(trimmedPrenom);
    const isTelMatch = trimmedTel === '' || data.tel1.includes(trimmedTel) || data.tel2.includes(trimmedTel);

    return isNomMatch && isPrenomMatch && isTelMatch;
  }

  ngOnDestroy(): void {
  }
}
