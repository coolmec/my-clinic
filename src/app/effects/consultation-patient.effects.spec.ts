import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConsultationPatientEffects } from './consultation-patient.effects';

describe('ConsultationPatientEffects', () => {
  let actions$: Observable<any>;
  let effects: ConsultationPatientEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsultationPatientEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ConsultationPatientEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
