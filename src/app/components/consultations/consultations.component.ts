import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal and NgbModalRef
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addConsultation, deleteConsultation, loadConsultations, upsertConsultation } from '../../actions/consultation.actions';
import { Consultation } from '../../models/consultation.model';
import { selectConsultationsListFeatureState } from '../../reducers';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { NouvelleConsultationComponent } from '../nouvelle-consultation/nouvelle-consultation.component';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
  providers: [NgbPaginationConfig]
})
export class ConsultationsComponent implements OnInit, OnDestroy, AfterViewInit {
  elements: Observable<Consultation[]>;
  headElements = ['Code', 'Designation', 'Type', 'TarifNormal', 'TarifAss.', 'Validité', 'Opération'];
  modalRef: NgbModalRef; // Change to NgbModalRef

  currentPage = 1;
  itemsPerPage = 5;
  maxSize = 5;
  rotate = false;
  ellipses = true;
  boundaryLinks = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal, // Change to NgbModal
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadConsultations());
    this.elements = this.store.select(selectConsultationsListFeatureState);
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  editRow(el: Consultation): void {
    const modalOptions: NgbModalOptions = {
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.open(NouvelleConsultationComponent, modalOptions);
    const content = this.modalRef.componentInstance as NouvelleConsultationComponent;
    content.editableRow = el;
    content.saveButtonClicked.subscribe((updatedConsultation: Consultation) => {
      this.store.dispatch(upsertConsultation({ consultation: updatedConsultation }));
      this.modalRef.close();
    });
  }

  removeRow(el: Consultation): void {
    this.modalRef = this.modalService.open(ModalConfirmationComponent);
    const content = this.modalRef.componentInstance as ModalConfirmationComponent;
    content.deleteButtonClicked.subscribe(() => {
      this.store.dispatch(deleteConsultation({ consultation: el }));
      this.modalRef.close();
    });
  }

  createConsultation(): void {
    const modalOptions: NgbModalOptions = {
      scrollable: true,
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.open(NouvelleConsultationComponent, modalOptions);
    const content = this.modalRef.componentInstance as NouvelleConsultationComponent;
    content.saveButtonClicked.subscribe((newConsultation: Consultation) => {
      this.store.dispatch(addConsultation({ consultation: newConsultation }));
      this.modalRef.close();
    });
  }

  ngOnDestroy(): void {}
}
