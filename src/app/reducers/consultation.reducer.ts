import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Consultation} from '../models/consultation.model';
import * as ConsultationActions from '../actions/consultation.actions';

export const consultationsFeatureKey = 'consultations';

export interface ConsultationState extends EntityState<Consultation> {
  // additional entities state properties
}

export function selectConsultationId(c: Consultation): string {
  return c.codeCons;
}

export const consultationAdapter: EntityAdapter<Consultation> = createEntityAdapter<Consultation>({
  selectId: selectConsultationId
});

export const initialConsultationState: ConsultationState = consultationAdapter.getInitialState({
  // additional entity state properties
});


export const consultationReducer = createReducer(
  initialConsultationState,
  on(ConsultationActions.addConsultation,
    (state, action) => consultationAdapter.addOne(action.consultation, state)
  ),
  on(ConsultationActions.upsertConsultation,
    (state, action) => consultationAdapter.upsertOne(action.consultation, state)
  ),
  on(ConsultationActions.addConsultations,
    (state, action) => consultationAdapter.addMany(action.consultations, state)
  ),
  on(ConsultationActions.upsertConsultations,
    (state, action) => consultationAdapter.upsertMany(action.consultations, state)
  ),
  on(ConsultationActions.updateConsultation,
    (state, action) => consultationAdapter.updateOne(action.consultation, state)
  ),
  on(ConsultationActions.updateConsultations,
    (state, action) => consultationAdapter.updateMany(action.consultations, state)
  ),
  on(ConsultationActions.deleteConsultation,
    (state, action) => consultationAdapter.removeOne(action.consultation.codeCons, state)
  ),
  on(ConsultationActions.deleteConsultations,
    (state, action) => consultationAdapter.removeMany(action.ids, state)
  ),
  on(ConsultationActions.loadConsultationsSuccess,
    (state, action) => consultationAdapter.setAll(action.consultations, state)
  ),
  on(ConsultationActions.clearConsultations,
    state => consultationAdapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = consultationAdapter.getSelectors();

// select the array of consultation ids
export const selectConsultationIds = selectIds;

// select the dictionary of consultation entities
export const selectConsultationEntities = selectEntities;

// select the array of consultations
export const selectAllConsultations = selectAll;

// select the total consultation count
export const selectConsultationTotal = selectTotal;
