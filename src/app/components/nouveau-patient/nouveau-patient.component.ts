import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';
import {Router} from '@angular/router';
import {Patient} from '../../models/patient';
import _default, {ICity, ICountry} from 'country-state-city';
import {outilsInjectionToken} from '../../utilities/outils';

@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.scss']
})
export class NouveauPatientComponent implements OnInit, OnDestroy {

  patientForm!: FormGroup; // FormGroup variable declaration
  pays: ICountry[];
  villes: ICity[];
  selectedCountryPhoneCode = this.outil.selectedCountryPhoneCode;
  localPhoneCode = this.outil.localPhoneCode;
  selectedMask: string;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private router: Router,
              @Inject(outilsInjectionToken) public outil) {
  }

  ngOnInit(): void {
    this.initPatient();
  }

  ngOnDestroy(): void {
  }

  get nom(): AbstractControl {
    return this.patientForm.get('nom');
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
   * Fonction that initialise a patient with values entered in the form   *
   */
  initPatient(): void {
    this.patientForm = this.formBuilder.group(
      {
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        dateNaiss: ['', [Validators.required]],
        sexe: ['', [Validators.required]],
        typeIdentite: ['', [Validators.required]],
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
   * Executed function each time the Identity doctype is changed, to selected the right mask
   * to apply to the identity doc number
   */
  onSelectTypeIdentite(): void {
    const selectedTypeIdentite: string = this.patientForm.value.typeIdentite;
    const selectedPays: string = this.patientForm.value.pays;
    if (selectedPays === 'Togo') {
      console.log('1 : ' + selectedPays + ' ' + selectedTypeIdentite);
      switch (selectedTypeIdentite) {
        case this.outil.typeIdentite[0]: {
          this.selectedMask = this.outil.mask[0];
          break;
        }
        case this.outil.typeIdentite[1]: {
          this.selectedMask = this.outil.mask[1];
          break;
        }
        case this.outil.typeIdentite[2]: {
          this.selectedMask = this.outil.mask[2];
          break;
        }
        case this.outil.typeIdentite[3]: {
          this.selectedMask = this.outil.mask[3];
          break;
        }
        default: {
          this.selectedMask = this.outil.mask[4];
          break;
        }
      }
    } else {
      console.log('2 : ' + selectedPays + ' ' + selectedTypeIdentite);
      this.selectedMask = this.outil.mask[4];
    }
  }

}
