import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from '../models/patient';
import {Subject} from 'rxjs';

const patientsUrl = 'http://localhost:8000/patients';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public patientsSubject = new Subject<Patient[]>();
  private listPatients: Patient[];

  constructor(private http: HttpClient) {
  }

  emitPatientSubject(): void {
    this.patientsSubject.next(this.listPatients.slice());
  }

  savePatient(patient: Patient): void {
    this.http.post(patientsUrl, patient).subscribe(
      () => {
        console.log('success ');
      },
      (error) => {
        console.log('Erreur ' + error);
      }
    );
    this.getPatient();
  }

  getListePatient(): Patient[] {
    return this.listPatients;
  }

  getPatient(): void {
    this.http.get<Patient[]>(patientsUrl).subscribe(
      value => {
        this.listPatients = value;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('Liste des patients récupérée avec succès.');
      }
    );
  }

}
