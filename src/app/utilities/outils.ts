import {InjectionToken} from '@angular/core';

export const outilsInjectionToken = new InjectionToken('outilsInjectionToken');

export const outil = {
  typeIdentite: [ // Table for the different Identity doctype
    'CNI', 'PASSEPORT', 'PERMIS DE CONDUIRE', 'CARTE D\'ELECTEUR'
  ],
  insurances: [ // Table for the different Insurance accepted
    'INAM', 'GRAS SAVOYE', 'SAHAM', 'SUNU', 'FIDELIA', 'GTA', 'PRUDENTIAL', 'LA CITOYENNE'
  ],
  mask: [ // mask type applied to Identity doc number
    '0000 000 0000', 'SS000000', '000 000 000', '0 000 00 00 00 00 00', 'AAAAAAAAAAAAAAA?'
  ],
  groupSanguin: [
    'O', 'A', 'B', 'AB'
  ],
  rhesus: [
    'positif', 'négatif'
  ],
  phenotypHb: [
    'AA', 'AS', 'SS', 'SC'
  ],
  selectedMask: '0000 000 0000',
  selectedCountryPhoneCode: '(+228)',
  localPhoneCode: '(+228)'
};
