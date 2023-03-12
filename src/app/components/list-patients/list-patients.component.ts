import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {ModalEditComponent} from '../modal-edit/modal-edit.component';
import {Store} from '@ngrx/store';
import {deletePatient, loadPatients, upsertPatient} from '../../actions/patient.actions';
import {Observable, of} from 'rxjs';
import {Patient} from '../../models/patient.model';
import {ModalConfirmationComponent} from '../modal-confirmation/modal-confirmation.component';
import {selectPatientsListFeatureState} from '../../reducers';
import { selectAllPatients } from 'src/app/reducers/patient.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  elements: Observable<Patient []>; // This will be used as observable of the arraylist of patients
  headElements = ['Id', 'Nom', 'Prénom', 'Tél. 1', 'Tél. 2', 'E-mail', 'Opération']; // Datatable header titles
  nameSearch: string = '';
  surnameSearch: string = '';
  telSearch: string = '';
  previous: string;
  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private store: Store) {
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    // Connection to the store, to get list of registered patients
    this.store.dispatch(loadPatients());
    // Selection of the downloaded list of registered patients from the store state
    this.elements = this.store.select(selectPatientsListFeatureState);
    // Feeding of the table with the data source
    this.mdbTable.setDataSource(this.elements);
    this.previous = this.mdbTable.getDataSource();    
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  editRow(el: Patient): void {
    const modalOptions = {
      scroll: true,
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe(
      (updatedPatient: Patient) => {
        this.store.dispatch(upsertPatient({patient: updatedPatient}));
      }
    );
  }

  removeRow(el: Patient): void {
    this.modalRef = this.modalService.show(ModalConfirmationComponent);
    this.modalRef.content.deleteButtonClicked.subscribe(
      () => {
        this.store.dispatch(deletePatient({patient: el}));
      }
    );
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if(this.nameSearch==''&&this.surnameSearch==''&&this.telSearch=='') {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    else {
      this.elements = this.elements.pipe(
        map(data => data.filter(value => this.recherche(value, this.nameSearch, this.surnameSearch, this.telSearch)))
      );
     this.mdbTable.setDataSource(prev);
    }
  }

  recherche(data: Patient, nom:string, prenom: string, tel:string): boolean {
    if(nom.trim()==''){
      if(prenom.trim()==''){
        if(tel){
          return (data.tel1.includes(tel)||data.tel2.includes(tel))
        }
      }
      else {
        if(tel){
          return data.prenom.includes(prenom)&&(data.tel1.includes(tel)||data.tel2.includes(tel))
        }
        else {
          return data.prenom.includes(prenom)
        }
      }
    }
    else {
      if(prenom){
        if(tel){
          return data.nom.includes(nom)&&data.prenom.includes(prenom)&&
          (data.tel1.includes(tel)||data.tel2.includes(tel))
        }
        else {
          return data.nom.includes(nom)&&data.prenom.includes(prenom)
        }
      }
      else {
        return data.nom.includes(nom)
      }
    }    
  }

  ngOnDestroy(): void {
  }
}
