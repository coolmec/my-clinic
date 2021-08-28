import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
import {Patient} from '../../models/patient';
import _default, {ICity, ICountry} from 'country-state-city';

@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit, OnDestroy {

  patientForm: FormGroup; // FormGroup variable declaration
  typeIdentite = [
    'PASSEPORT', 'CARTE D\'ELECTEUR', 'PERMIS DE CONDUIRE', 'CNI' // Table for the different Identity doctype
  ];
  insurances = [
    'INAM', 'GRAS SAVOYE', 'SAHAM', 'SUNU', 'FIDELIA', 'GTA', 'PRUDENTIAL', 'LA CITOYENNE' // Table for the different Insurance accepted
  ];
  pays: ICountry[];
  villes: ICity[];
  mask: string[] =
    ['SS000000', '0 000 00 00 00 00 00', '000 000 000', '0000 000 0000', 'AAAAAAAAAAAAAAA?']; // mask type applied to Identity doc number
  selectedMask = '0000 000 0000';
  selectedCountryPhoneCode = '(+228)';
  localPhoneCode = '(+228)';

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initPatient();
  }

  ngOnDestroy(): void {
  }

  /**
   * Fonction that initialise a patient with values entered in the form   *
   */
  initPatient(): void {
    this.patientForm = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        dateNaiss: [Date.now(), [Validators.required]],
        sexe: ['M', [Validators.required]],
        typeIdentite: ['CNI', [Validators.required]],
        numIdentite: ['', [Validators.required]],
        nationalite: ['', [Validators.required]],
        pays: ['Togo', [Validators.required]],
        ville: ['Lomé', [Validators.required]],
        quartier: ['', [Validators.required]],
        tel1: ['', [Validators.required]],
        tel2: ['', []],
        email: ['', [Validators.email]],
        pec: ['non', [Validators.required]],
        assurance: ['', []],
        numAssure: ['', []],
        numAyantDroit: ['', []],
        groupSanguin: ['', []],
        rhesus: ['', []],
        phenotypHb: ['', []],
        pathologies: ['Aucune', []],
        allergies: ['Aucune', []],
        dateEnreg: [Date.now(), []]
      }
    );
    this.pays = _default.getAllCountries();
    this.villes = _default.getCitiesOfCountry('TG');

  }

  /**
   * Executed function to save the new client in the database
   */
  onSubmitForm(): void {
    this.patientForm.value.dateNaiss = new Date(this.patientForm.value.dateNaiss);
    this.patientForm.value.dateEnreg = new Date(this.patientForm.value.dateEnreg);
    const newPatient: Patient = Object.assign({}, this.patientForm.value);
    this.patientService.savePatient(newPatient);
    this.router.navigate(['']);
  }

  /**
   * Executed function each time the country is changed to collect corresponding cities
   */
  onSelectCountry(): void {
    const selectedCountryName = this.patientForm.value.pays;
    let selectedCountryCode;
    this.pays.forEach(
      (one) => {
        if (one.name === selectedCountryName) {
          selectedCountryCode = one.isoCode;
          this.selectedCountryPhoneCode = one.phonecode;
        }
      });
    this.villes = _default.getCitiesOfCountry(selectedCountryCode);
    this.selectedCountryPhoneCode = '(+' + this.selectedCountryPhoneCode + ')';
    this.onSelectTypeIdentite();
  }

  /**
   * Executed function each time the Identity doctype is changed, to selected the right mask
   * to apply to the identity doc number
   */
  onSelectTypeIdentite(): void {
    const selectedTypeIdentite: string = this.patientForm.value.typeIdentite;
    const selectedPays: string = this.patientForm.value.pays;
    if (selectedPays === 'Togo') {
      console.log('1 : ' + selectedPays + ' ' + selectedTypeIdentite);
      switch (selectedTypeIdentite) {
        case this.typeIdentite[0]: {
          this.selectedMask = this.mask[0];
          break;
        }
        case this.typeIdentite[1]: {
          this.selectedMask = this.mask[1];
          break;
        }
        case this.typeIdentite[2]: {
          this.selectedMask = this.mask[2];
          break;
        }
        case this.typeIdentite[3]: {
          this.selectedMask = this.mask[3];
          break;
        }
        default: {
          this.selectedMask = this.mask[4];
          break;
        }
      }
    } else {
      console.log('2 : ' + selectedPays + ' ' + selectedTypeIdentite);
      this.selectedMask = this.mask[4];
    }
  }
}
