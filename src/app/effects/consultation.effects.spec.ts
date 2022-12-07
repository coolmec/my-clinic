import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConsultationEffects } from './consultation.effects';

describe('ConsultationEffects', () => {
  let actions$: Observable<any>;
  let effects: ConsultationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsultationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ConsultationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
