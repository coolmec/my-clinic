import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient.model';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';

const patientsUrl = 'http://localhost:8000/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  // Method to create a new patient
  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(patientsUrl, patient);
  }

  // Method to retrieve all registered patients from database
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(patientsUrl);
  }

  // Method to update a patient
  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(patientsUrl, patient);
  }

  // Method to delete a patient}
  deletePatient(patient: Patient): Observable<Patient> {
    return this.http.delete<Patient>(patientsUrl,
      {observe: 'body', responseType: 'json', body: patient});
  }

}
