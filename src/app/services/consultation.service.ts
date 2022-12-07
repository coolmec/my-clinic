import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consultation} from '../models/consultation.model';

const consultationUrl = 'http://localhost:8000/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) {
  }

  // Method to create a new consultation
  saveConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(consultationUrl, consultation);
  }

  // Method to retrieve all registered consultations from database
  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(consultationUrl);
  }

  // Method to update a consultation
  updateConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(consultationUrl, consultation);
  }

}
