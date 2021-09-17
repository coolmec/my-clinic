import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
import {ModalEditComponent} from './modal-edit/modal-edit.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {outil, outilsInjectionToken} from './utilities/outils';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NouveauPatientComponent,
    ListPatientsComponent,
    ModalEditComponent
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
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: outilsInjectionToken, useValue: outil}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
