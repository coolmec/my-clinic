import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ConsultationPatient } from '../models/consultation-patient.model';
import * as ConsultationPatientActions from '../actions/consultation-patient.actions';

export const consultationPatientsFeatureKey = 'consultationPatients';

export interface ConsultationPatientState extends EntityState<ConsultationPatient> {
  // additional entities state properties
}

export function selectConsultationPatientId(cp: ConsultationPatient): number {
  return cp.idCp;
}

export const adapter: EntityAdapter<ConsultationPatient> = createEntityAdapter<ConsultationPatient>({
  selectId: selectConsultationPatientId
});

export const initialState: ConsultationPatientState = adapter.getInitialState({
  // additional entity state properties
});


export const consultationPatientReducer = createReducer(
  initialState,
  on(ConsultationPatientActions.addConsultationPatient,
    (state, action) => adapter.addOne(action.consultationPatient, state)
  ),
  on(ConsultationPatientActions.upsertConsultationPatient,
    (state, action) => adapter.upsertOne(action.consultationPatient, state)
  ),
  on(ConsultationPatientActions.addConsultationPatients,
    (state, action) => adapter.addMany(action.consultationPatients, state)
  ),
  on(ConsultationPatientActions.upsertConsultationPatients,
    (state, action) => adapter.upsertMany(action.consultationPatients, state)
  ),
  on(ConsultationPatientActions.updateConsultationPatient,
    (state, action) => adapter.updateOne(action.consultationPatient, state)
  ),
  on(ConsultationPatientActions.updateConsultationPatients,
    (state, action) => adapter.updateMany(action.consultationPatients, state)
  ),
  on(ConsultationPatientActions.deleteConsultationPatient,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ConsultationPatientActions.deleteConsultationPatients,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ConsultationPatientActions.loadConsultationPatients,
    (state, action) => adapter.setAll(action.consultationPatients, state)
  ),
  on(ConsultationPatientActions.clearConsultationPatients,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of consultationPatients
export const selectAllConsultationPatients = selectAll;
