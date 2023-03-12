import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consultation} from '../models/consultation.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, take, tap } from 'rxjs/operators';

const consultationUrl = 'http://localhost:8000/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private consultationsWithKeys:Observable<any>;
  private consultationsRef: AngularFireList<Consultation>;
  private consultations: Observable<Consultation[]>;

  constructor(
    // Uncomment the below line if you want to use a local database like MySQL for e.g
    // private http: HttpClient,
    private db: AngularFireDatabase) {
      this.consultationsRef = db.list<Consultation>('/consultation');
      this.consultations = this.consultationsRef.valueChanges();
      // Use snapshotChanges().map() to store the key
      this.consultationsWithKeys = this.consultationsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(p => ({ key: p.payload.key, ...p.payload.val() }))
      )
    );
  }

/**
   * Method to create a new consultation 
   * @param consultation 
   * @returns an Observable of the new consultation
   */
saveConsultation(consultation: Consultation): Observable<Consultation> {
  // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
  // return this.http.post<consultation>(consultationsUrl, consultation);
  this.consultationsRef.push(consultation);
  return this.consultations.pipe(map(values => values.pop()));
}

/**
 * Method to retrieve all registered consultations from database
 * @returns an Observable of all registered consultations
 */
getConsultations(): Observable<Consultation[]> {
  // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
  // return this.http.get<consultation[]>(consultationsUrl);
  return this.consultations;
}

/**
 * Method to update a consultation
 * @param consultation 
 * @returns an Observable of the updated consultation
 */
updateConsultation(consultation: Consultation): Observable<Consultation> {
  // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
  // return this.http.put<consultation>(consultationsUrl, consultation);
  let key: string;
  this.consultationsRef.snapshotChanges().pipe(
    map(data => data.find(data => data.payload.val().codeCons == consultation.codeCons)),
    take(1),
    tap(value => this.consultationsRef.update(value.key, consultation))
  ).subscribe();
  return this.consultations.pipe(map(values => values.find(value => value.codeCons == consultation.codeCons)));
}

/**
 * Method to delete a consultation
 * @param consultation 
 * @returns an Observable of the deleted consultation
 */
deleteConsultation(consultation: Consultation): Observable<Consultation> {
  // Uncomment the below line if you want to use a local database like MySQL for e.g and comment others
/*     return this.http.delete<consultation>(consultationsUrl,
    {observe: 'body', responseType: 'json', body: consultation}); */
    let key: string;
    this.consultationsRef.snapshotChanges().pipe(
      map(data => data.find(data => data.payload.val().codeCons == consultation.codeCons)),
      take(1),
      tap(value => this.consultationsRef.remove(value.key))
    ).subscribe();
  return this.consultations.pipe(map(values => values.find(value => value.codeCons == consultation.codeCons)));
}

}
