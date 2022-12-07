import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectConsultationsListFeatureState} from '../../reducers';
import {ModalConfirmationComponent} from '../modal-confirmation/modal-confirmation.component';
import {addConsultation, deleteConsultation, loadConsultations, upsertConsultation} from '../../actions/consultation.actions';
import {Consultation} from '../../models/consultation.model';
import {NouvelleConsultationComponent} from '../nouvelle-consultation/nouvelle-consultation.component';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  elements: Observable<Consultation []>; // This will be used as observable of the arraylist of patients
  headElements = ['Code', 'Designation', 'Type', 'TarifNormal', 'TarifAss.', 'Validité', 'Opération']; // Datatable header titles
  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private store: Store) {
  }

  ngOnInit(): void {
    // Connection to the store, to get list of registered patients
    this.store.dispatch(loadConsultations());
    // Selection of the downloaded list of registered patients from the store state
    this.elements = this.store.select(selectConsultationsListFeatureState);
    // Feeding of the table with the data source
    this.mdbTable.setDataSource(this.elements);
    this.elements.forEach(
      value => console.log(value)
    );
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  editRow(el: Consultation): void {
    const modalOptions = {
      scroll: true,
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(NouvelleConsultationComponent, modalOptions);
    const content = this.modalRef.content as NouvelleConsultationComponent;
    content.saveButtonClicked.subscribe(
      (updatedConsultation: Consultation) => {
        this.store.dispatch(upsertConsultation({consultation: updatedConsultation}));
      }
    );
  }

  removeRow(el: Consultation): void {
    this.modalRef = this.modalService.show(ModalConfirmationComponent);
    this.modalRef.content.deleteButtonClicked.subscribe(
      () => {
        this.store.dispatch(deleteConsultation({consultation: el}));
      }
    );
  }

  createConsultation(): void {
    const modalOptions = {
      scroll: true,
      data: {
      }
    };
    this.modalRef = this.modalService.show(NouvelleConsultationComponent, modalOptions);
    const content = this.modalRef.content as NouvelleConsultationComponent;
    content.saveButtonClicked.subscribe(
      (newConsultation: Consultation) => {
        this.store.dispatch(addConsultation({consultation: newConsultation}));
      }
    );
  }

  ngOnDestroy(): void {
  }
}
