import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Patient} from '../models/patient.model';
import * as PatientActions from '../actions/patient.actions';

export const patientsListFeatureKey = 'patientsListState';

export interface PatientState extends EntityState<Patient> {
  // additional entities state properties
}

export function selectPatientId(p: Patient): string {
  return p.id;
}

export const patientAdapter: EntityAdapter<Patient> = createEntityAdapter<Patient>({
  selectId: selectPatientId
});

export const initialPatientState: PatientState = patientAdapter.getInitialState({
  // additional entity state properties
});


export const patientReducer = createReducer(
  initialPatientState,
  on(PatientActions.addPatient,
    (state, action) => patientAdapter.addOne(action.patient, state)
  ),
  on(PatientActions.upsertPatient,
    (state, action) => patientAdapter.upsertOne(action.patient, state)
  ),
  on(PatientActions.addPatients,
    (state, action) => patientAdapter.addMany(action.patients, state)
  ),
  on(PatientActions.upsertPatients,
    (state, action) => patientAdapter.upsertMany(action.patients, state)
  ),
  on(PatientActions.updatePatient,
    (state, action) => patientAdapter.updateOne(action.patient, state)
  ),
  on(PatientActions.updatePatients,
    (state, action) => patientAdapter.updateMany(action.patients, state)
  ),
  on(PatientActions.deletePatient,
    (state, action) => patientAdapter.removeOne(action.patient.id, state)
  ),
  on(PatientActions.deletePatients,
    (state, action) => patientAdapter.removeMany (action.ids, state)
  ),
  on(PatientActions.loadPatientsSuccess,
    (state, action) => patientAdapter.setAll(action.patients, state)
  ),
  on(PatientActions.clearPatients,
    state => patientAdapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = patientAdapter.getSelectors();

// select the array of user ids
export const selectPatientIds = selectIds;

// select the dictionary of user entities
export const selectPatientEntities = selectEntities;

// select the array of users
export const selectAllPatients = selectAll;

// select the total user count
export const selectPatientTotal = selectTotal;
