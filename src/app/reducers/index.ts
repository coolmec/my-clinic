import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {patientReducer, PatientState, selectAllPatients} from './patient.reducer';
import {consultationReducer, ConsultationState, selectAllConsultations} from './consultation.reducer';
import {consultationPatientReducer, ConsultationPatientState, selectAllConsultationPatients} from './consultation-patient.reducer';

export const patientFeatureStateKey = 'patientState';
export const consultationFeatureStateKey = 'consultationState';
export const consultationPatientFeatureStateKey = 'consultationPatientState';

export interface State {
  patientState: PatientState;
  consultationState: ConsultationState;
  consultationPatientState: ConsultationPatientState;
}

export const reducers: ActionReducerMap<State> = {
  patientState: patientReducer,
  consultationState: consultationReducer,
  consultationPatientState: consultationPatientReducer
};

export const selectPatientFeatureState = createFeatureSelector<PatientState>(patientFeatureStateKey);
export const selectConsultationFeatureState = createFeatureSelector<ConsultationState>(consultationFeatureStateKey);
export const selectConsultationPatientFeatureState = createFeatureSelector<ConsultationPatientState>(consultationPatientFeatureStateKey);

export const selectPatientsListFeatureState = createSelector(
  selectPatientFeatureState, selectAllPatients);
export const selectConsultationsListFeatureState = createSelector(
  selectConsultationFeatureState, selectAllConsultations);
export const selectConsultationPatientsListFeatureState = createSelector(
  selectConsultationPatientFeatureState, selectAllConsultationPatients);

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];
