import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConsultationPatient} from '../models/consultation-patient.model';
import {Observable} from 'rxjs';

const consultationPatientsUrl = 'http://localhost:8000/consultationPatients';

@Injectable({
  providedIn: 'root'
})
export class ConsultationPatientService {

  constructor(
    private http: HttpClient
  ) { }

addConsultationPatient(cp: ConsultationPatient): Observable<ConsultationPatient> {
    return this.http.post<ConsultationPatient>(consultationPatientsUrl, cp);
}

}
