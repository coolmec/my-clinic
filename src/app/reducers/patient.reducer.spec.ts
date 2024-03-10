import { patientReducer, initialState } from '../reducers/patient.reducer';

describe('Patient Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = patientReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
