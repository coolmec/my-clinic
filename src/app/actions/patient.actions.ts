import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {Patient} from '../models/patient.model';

export const loadPatients = createAction(
  '[Patient/API] Load Patients'
);

export const loadPatientsSuccess = createAction(
  '[Patient/API] Load Patients Success',
  props<{ patients: Patient[] }>()
);

export const loadPatientsFailure = createAction(
  '[Patient/API] Load Patients Failure',
  props<{ error: any }>()
);

export const addPatient = createAction(
  '[Patient/API] Add Patient',
  props<{ patient: Patient }>()
);

export const addPatientSuccess = createAction(
  '[Patient/API] Add Patient Success',
  props<{ patient: Patient }>()
);

export const addPatientFailure = createAction(
  '[Patient/API] Add Patient Failure',
  props<{ error: any }>()
);

export const upsertPatient = createAction(
  '[Patient/API] Upsert Patient',
  props<{ patient: Patient }>()
);

export const upsertPatientSuccess = createAction(
  '[Patient/API] Upsert Patient Success',
  props<{ patient: Patient }>()
);

export const upsertPatientFailure = createAction(
  '[Patient/API] Upsert Patient Failure',
  props<{ error: any }>()
);

export const addPatients = createAction(
  '[Patient/API] Add Patients',
  props<{ patients: Patient[] }>()
);

export const upsertPatients = createAction(
  '[Patient/API] Upsert Patients',
  props<{ patients: Patient[] }>()
);

export const updatePatient = createAction(
  '[Patient/API] Update Patient',
  props<{ patient: Update<Patient> }>()
);

export const updatePatients = createAction(
  '[Patient/API] Update Patients',
  props<{ patients: Update<Patient>[] }>()
);

export const deletePatient = createAction(
  '[Patient/API] Delete Patient',
  props<{ patient: Patient }>()
);
export const deletePatientSuccess = createAction(
  '[Patient/API] Delete Patient Success',
  props<{ patient: Patient }>()
);
export const deletePatientFailure = createAction(
  '[Patient/API] Delete Patient Failure',
  props<{ error: any }>()
);

export const deletePatients = createAction(
  '[Patient/API] Delete Patients',
  props<{ ids: string[] }>()
);

export const clearPatients = createAction(
  '[Patient/API] Clear Patients'
);
