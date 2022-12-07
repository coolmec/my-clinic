import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-modules';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {NouveauPatientComponent} from './components/nouveau-patient/nouveau-patient.component';
import {ListPatientsComponent} from './components/list-patients/list-patients.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {ModalEditComponent} from './components/modal-edit/modal-edit.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {outil, outilsInjectionToken} from './utilities/outils';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {PatientEffects} from './effects/patient.effects';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {ToastrModule} from 'ngx-toastr';
import {ErrorMetadataService} from './services/error-metadata.service';
import {HttpErrorInterceptorService} from './services/http-error-interceptor.service';
import {ModalConfirmationComponent} from './components/modal-confirmation/modal-confirmation.component';
import { ConsultationsComponent } from './components/consultations/consultations.component';
import { ConsultationEffects } from './effects/consultation.effects';
import { NouvelleConsultationComponent } from './components/nouvelle-consultation/nouvelle-consultation.component';
import { ConsultationPatientEffects } from './effects/consultation-patient.effects';
import { ConsultationPatientComponent } from './components/consultation-patient/consultation-patient.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NouveauPatientComponent,
    ListPatientsComponent,
    ModalEditComponent,
    MenuBarComponent,
    ModalConfirmationComponent,
    ConsultationsComponent,
    NouvelleConsultationComponent,
    ConsultationPatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([PatientEffects, ConsultationEffects]),
    EffectsModule.forFeature([ConsultationPatientEffects])
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: outilsInjectionToken, useValue: outil},
    {provide: ErrorHandler, useClass: ErrorMetadataService},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
