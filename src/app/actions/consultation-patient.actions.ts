import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ConsultationPatient } from '../models/consultation-patient.model';

export const loadConsultationPatients = createAction(
  '[ConsultationPatient/API] Load ConsultationPatients',
  props<{ consultationPatients: ConsultationPatient[] }>()
);

export const addConsultationPatient = createAction(
  '[ConsultationPatient/API] Add ConsultationPatient',
  props<{ consultationPatient: ConsultationPatient }>()
);

export const addConsultationPatientSuccess = createAction(
  '[ConsultationPatient/API] Add ConsultationPatient Success',
  props<{ consultationPatient: ConsultationPatient }>()
);

export const addConsultationPatientFailure = createAction(
  '[ConsultationPatient/API] Add ConsultationPatient Failure',
  props<{ error: any }>()
);

export const upsertConsultationPatient = createAction(
  '[ConsultationPatient/API] Upsert ConsultationPatient',
  props<{ consultationPatient: ConsultationPatient }>()
);

export const addConsultationPatients = createAction(
  '[ConsultationPatient/API] Add ConsultationPatients',
  props<{ consultationPatients: ConsultationPatient[] }>()
);

export const upsertConsultationPatients = createAction(
  '[ConsultationPatient/API] Upsert ConsultationPatients',
  props<{ consultationPatients: ConsultationPatient[] }>()
);

export const updateConsultationPatient = createAction(
  '[ConsultationPatient/API] Update ConsultationPatient',
  props<{ consultationPatient: Update<ConsultationPatient> }>()
);

export const updateConsultationPatients = createAction(
  '[ConsultationPatient/API] Update ConsultationPatients',
  props<{ consultationPatients: Update<ConsultationPatient>[] }>()
);

export const deleteConsultationPatient = createAction(
  '[ConsultationPatient/API] Delete ConsultationPatient',
  props<{ id: string }>()
);

export const deleteConsultationPatients = createAction(
  '[ConsultationPatient/API] Delete ConsultationPatients',
  props<{ ids: string[] }>()
);

export const clearConsultationPatients = createAction(
  '[ConsultationPatient/API] Clear ConsultationPatients'
);
