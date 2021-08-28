import {Client} from './client';

export interface Patient extends Client {
  dateConvPatient?: Date;
  pec;
  assurance?;
  numAssure?;
  numAyantDroit?;
  groupSanguin?;
  rhesus?;
  phenotypHb?;
  pathologies?;
  allergies?;
}
