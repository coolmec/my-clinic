import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PatientService} from '../services/patient.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as actionsPatient from '../actions/patient.actions';
import {NotificationService} from '../services/notification.service';
import {Router} from '@angular/router';


@Injectable()
export class PatientEffects {

  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  patientsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsPatient.loadPatients),
      mergeMap(() => this.patientService.getPatients().pipe(
        map(
          patients => actionsPatient.loadPatientsSuccess({patients})
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de chargement des données : ' + error,
              'Récupération de la liste des patients');
            return of(actionsPatient.loadPatientsFailure({error}));
          })
        )
      )
    ));

  updatePatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(actionsPatient.upsertPatient),
      mergeMap((updateAction) => this.patientService.updatePatient(updateAction.patient).pipe(
        map(
          patient => {
            this.notificationService.showSuccess('Patient modifié avec succès !',
              'Modification Patient');
            return actionsPatient.upsertPatientSuccess({patient});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de modification du patient : ' + error,
            'Modification Patient');
            return of(actionsPatient.upsertPatientFailure({error}));
          }
        )
      )
    )
  ));

  createPatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(actionsPatient.addPatient),
      mergeMap((addedPatient) => this.patientService.savePatient(addedPatient.patient).pipe(
        map(
          patient => {
            this.notificationService.showSuccess('Nouveau patient crée avec succès !',
              'Enregistrement Patient');
            this.router.navigate(['']);
            return actionsPatient.addPatientSuccess({patient});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de création : ' + error,
              'Enregistrement Patient');
            return of(actionsPatient.addPatientFailure({error}));
          }
        )
      )
    )
  ));

  deletePatient$ = createEffect(
    () => this.actions$.pipe(
      ofType(actionsPatient.deletePatient),
      mergeMap((deletedPatient) => this.patientService.deletePatient(deletedPatient.patient).pipe(
        map(
          patient => {
            this.notificationService.showSuccess('Patient supprimé avec succès !',
              'Suppression Patient');
            return actionsPatient.deletePatientSuccess({patient});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de suppression du patient !',
              'Suppression patient');
            return of(actionsPatient.deletePatientFailure({error}));
          }
        )
      ))
    )
  );

}
