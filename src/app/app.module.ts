import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationPatientComponent } from './components/consultation-patient/consultation-patient.component';
import { ConsultationsComponent } from './components/consultations/consultations.component';
import { HomeComponent } from './components/home/home.component';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { NouveauPatientComponent } from './components/nouveau-patient/nouveau-patient.component';
import { NouvelleConsultationComponent } from './components/nouvelle-consultation/nouvelle-consultation.component';
import { ConsultationPatientEffects } from './effects/consultation-patient.effects';
import { ConsultationEffects } from './effects/consultation.effects';
import { PatientEffects } from './effects/patient.effects';
import { MaterialModule } from './material-modules';
import { metaReducers, reducers } from './reducers';
import { ErrorMetadataService } from './services/error-metadata.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { outil, outilsInjectionToken } from './utilities/outils';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablePatientsComponent } from './components/table-patients/table-patients.component';


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
    ConsultationPatientComponent
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
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([PatientEffects, ConsultationEffects]),
    EffectsModule.forFeature([ConsultationPatientEffects]),    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbModule,
    TablePatientsComponent
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
