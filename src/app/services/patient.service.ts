import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient.model';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';

import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { filter, tap, map, take } from 'rxjs/operators';

const patientsUrl = 'http://localhost:8000/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientsWithKeys:Observable<any>;
  private patientsRef: AngularFireList<Patient>;
  private patients: Observable<Patient[]>;

  constructor(
    // Uncomment the below line if you want to use a local database like MySQL for e.g
    //private http: HttpClient, 
    private db: AngularFireDatabase
    ) {
      this.patientsRef = db.list<Patient>('/patients');
      this.patients = this.patientsRef.valueChanges();
      // Use snapshotChanges().map() to store the key
      this.patientsWithKeys = this.patientsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(p => ({ key: p.payload.key, ...p.payload.val() }))
      )
    );
      }

  /**
   * Method to create a new patient 
   * @param patient 
   * @returns an Observable of the new patient
   */
  savePatient(patient: Patient): Observable<Patient> {
    // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
    // return this.http.post<Patient>(patientsUrl, patient);
    this.patientsRef.push(patient);
    return this.patients.pipe(map(values => values.pop()));
  }

  /**
   * Method to retrieve all registered patients from database
   * @returns an Observable of all registered patients
   */
  getPatients(): Observable<Patient[]> {
    // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
    // return this.http.get<Patient[]>(patientsUrl);
    return this.patients;
  }

  /**
   * Method to update a patient
   * @param patient 
   * @returns an Observable of the updated patient
   */
  updatePatient(patient: Patient): Observable<Patient> {
    // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
    // return this.http.put<Patient>(patientsUrl, patient);
    let key: string;
    this.patientsRef.snapshotChanges().pipe(
      map(data => data.find(data => data.payload.val().id == patient.id)),
      take(1),
      tap(value => this.patientsRef.update(value.key, patient))
    ).subscribe();
    return this.patients.pipe(map(values => values.find(value => value.id == patient.id)));
  }

  /**
   * Method to delete a patient
   * @param patient 
   * @returns an Observable of the deleted patient
   */
  deletePatient(patient: Patient): Observable<Patient> {
    // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
/*     return this.http.delete<Patient>(patientsUrl,
      {observe: 'body', responseType: 'json', body: patient}); */
      let key: string;
      this.patientsRef.snapshotChanges().pipe(
        map(data => data.find(data => data.payload.val().id == patient.id)),
        take(1),
        tap(value => this.patientsRef.remove(value.key))
      ).subscribe();
    return this.patients.pipe(map(values => values.find(value => value.id == patient.id)));
  }

}
