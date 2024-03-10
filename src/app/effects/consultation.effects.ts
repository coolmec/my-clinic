import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ConsultationService} from '../services/consultation.service';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';
import * as ConsultationActions from '../actions/consultation.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {upsertConsultation} from '../actions/consultation.actions';


@Injectable()
export class ConsultationEffects {



  constructor(
    private actions$: Actions,
    private consultationService: ConsultationService,
    private router: Router,
    private notificationService: NotificationService) {}

  consultationsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsultationActions.loadConsultations),
      mergeMap(() => this.consultationService.getConsultations().pipe(
        map(
          consultations => {
            return ConsultationActions.loadConsultationsSuccess({consultations});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de chargement des données : ' + error,
              'Récupération de la liste des patients');
            return of(ConsultationActions.loadConsultationsFailure({error}));
          })
        )
      )
    ));

  createConsultation$ = createEffect(
    () => this.actions$.pipe(
      ofType(ConsultationActions.addConsultation),
      mergeMap((addedConsultation) => this.consultationService.saveConsultation(addedConsultation.consultation).pipe(
        map(
          consultation => {
            this.notificationService.showSuccess('Nouvelle consultation créee avec succès !',
              'Enregistrement Consultation');
            return ConsultationActions.addConsultationSuccess({consultation});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de création : ' + error,
              'Enregistrement Consultation');
            return of(ConsultationActions.addConsultationFailure({error}));
          }
        )
        )
      )
    ));

  updateConsultation$ = createEffect(
    () => this.actions$.pipe(
      ofType(ConsultationActions.upsertConsultation),
      mergeMap((updatedConsultation) => this.consultationService.updateConsultation(updatedConsultation.consultation).pipe(
        map(
          consultation => {
            this.notificationService.showSuccess('Nouvelle consultation modifiée avec succès !',
              'Modification Consultation');
            return ConsultationActions.upsertConsultationSuccess({consultation});
          }
        ),
        catchError(
          error => {
            this.notificationService.showError('Erreur de modification : ' + error,
              'Modification Consultation');
            return of(ConsultationActions.upsertConsultationFailure({error}));
          }
        )
        )
      )
    ));

}
