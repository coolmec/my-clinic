import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NouveauPatientComponent} from './components/nouveau-patient/nouveau-patient.component';
import {ListPatientsComponent} from './components/list-patients/list-patients.component';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
  {path: 'nouveau-patient', component: NouveauPatientComponent},
  {path: 'list-patients', component: ListPatientsComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
