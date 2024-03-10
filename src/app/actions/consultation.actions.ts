import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Consultation } from '../models/consultation.model';

export const loadConsultations = createAction(
  '[Consultation/API] Load Consultations'
);

export const loadConsultationsSuccess = createAction(
  '[Consultation/API] Load Consultations success',
  props<{ consultations: Consultation[] }>()
);

export const loadConsultationsFailure = createAction(
  '[Consultation/API] Load Consultations Failure',
  props<{ error: any }>()
);

export const addConsultation = createAction(
  '[Consultation/API] Add Consultation',
  props<{ consultation: Consultation }>()
);

export const addConsultationSuccess = createAction(
  '[Consultation/API] Add Consultation Success',
  props<{ consultation: Consultation }>()
);

export const addConsultationFailure = createAction(
  '[Consultation/API] Add Consultation Failure',
  props<{ error: any }>()
);

export const upsertConsultation = createAction(
  '[Consultation/API] Upsert Consultation',
  props<{ consultation: Consultation }>()
);
export const upsertConsultationSuccess = createAction(
  '[Consultation/API] Upsert Consultation Success',
  props<{ consultation: Consultation }>()
);
export const upsertConsultationFailure = createAction(
  '[Consultation/API] Upsert Consultation Failure',
  props<{ error: any }>()
);

export const addConsultations = createAction(
  '[Consultation/API] Add Consultations',
  props<{ consultations: Consultation[] }>()
);

export const upsertConsultations = createAction(
  '[Consultation/API] Upsert Consultations',
  props<{ consultations: Consultation[] }>()
);

export const updateConsultation = createAction(
  '[Consultation/API] Update Consultation',
  props<{ consultation: Update<Consultation> }>()
);

export const updateConsultations = createAction(
  '[Consultation/API] Update Consultations',
  props<{ consultations: Update<Consultation>[] }>()
);

export const deleteConsultation = createAction(
  '[Consultation/API] Delete Consultation',
  props<{ consultation: Consultation }>()
);

export const deleteConsultationSuccess = createAction(
  '[Consultation/API] Delete Consultation Success',
  props<{ consultation: Consultation }>()
);

export const deleteConsultationFailure = createAction(
  '[Consultation/API] Delete Consultation Failure',
  props<{ error: any }>()
);

export const deleteConsultations = createAction(
  '[Consultation/API] Delete Consultations',
  props<{ ids: string[] }>()
);

export const clearConsultations = createAction(
  '[Consultation/API] Clear Consultations'
);
