import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Patient} from '../../models/patient.model';
import {selectAllConsultationPatients} from '../../reducers/consultation-patient.reducer';
import {selectAllPatients} from '../../reducers/patient.reducer';
import {Consultation} from '../../models/consultation.model';
import {selectAllConsultations} from '../../reducers/consultation.reducer';
import {ConsultationPatient} from '../../models/consultation-patient.model';
import {NgForm} from '@angular/forms';
import {loadPatients} from '../../actions/patient.actions';
import {loadConsultations} from '../../actions/consultation.actions';
import {selectConsultationsListFeatureState, selectPatientsListFeatureState} from '../../reducers';

@Component({
  selector: 'app-consultation-patient',
  templateUrl: './consultation-patient.component.html',
  styleUrls: ['./consultation-patient.component.scss']
})
export class ConsultationPatientComponent implements OnInit {

  listPatient$: Observable<Patient []>; // Observable de la liste des patients
  listConsult$: Observable<Consultation []>; // Observable de la liste des consultations
  consultationPatient: ConsultationPatient;
  ind: number;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // Connection to the store, to get list of registered patients
    this.store.dispatch(loadPatients());
    // Récupération de la liste des patients
    this.listPatient$ = this.store.select(selectPatientsListFeatureState);
    // Connection to the store, to get list of registered patients
    this.store.dispatch(loadConsultations());
    // Récupération de la liste des consultations
    this.listConsult$ = this.store.select(selectConsultationsListFeatureState);

  }

  onSubmit(cPForm: NgForm): void {
    this.consultationPatient = {idPatient: this.getPatientId(cPForm.value.idPatient),
      codeCons: this.getCodeCons(cPForm.value.idConsult), dateCons: new Date(), dateExp: new Date()};
    console.log(this.consultationPatient);
  }

  getPatientId(identity: string): number {
    let id: number = null;
    this.listPatient$.forEach(
      patients => {
        patients.forEach(
          patient => {
            const nom = patient.nom + ' ' + patient.prenom;
            if (identity === nom) {
              id = patient.id;
            }
          }
        );
      }
    );
    return id;
  }

  getCodeCons(designation: string): string {
    let id: string = null;
    this.listConsult$.forEach(
      consults => {
        consults.forEach(
          consult => {
            if (designation === consult.designation) {
              id = consult.codeCons;
            }
          }
        );
      }
    );
    return id;
  }

}
