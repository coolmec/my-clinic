import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as consultationPatientActions from '../actions/consultation-patient.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ConsultationPatientService} from '../services/consultation-patient.service';
import {NotificationService} from '../services/notification.service';
import {of} from 'rxjs';


@Injectable()
export class ConsultationPatientEffects {



  constructor(
    private actions$: Actions,
    private cps: ConsultationPatientService,
    private notificationService: NotificationService
    ) {}

  createConsultationPatientEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(consultationPatientActions.addConsultationPatient),
      mergeMap(
        action => this.cps.addConsultationPatient(action.consultationPatient).pipe(
          map(
            addedvalue => {
              this.notificationService.showSuccess('Nouvelle visite de consultation créee avec succès !',
                'Enregistrement Consultation Patient');
              return consultationPatientActions.addConsultationPatientSuccess({consultationPatient: addedvalue });
            },
            catchError(
              err => {
                this.notificationService.showError('Erreur de création : ' + err,
                  'Enregistrement Consultation Patient');
                return of(consultationPatientActions.addConsultationPatientFailure({error: err}));
              }
            )
          )
        )
      )
    )
  );

}
