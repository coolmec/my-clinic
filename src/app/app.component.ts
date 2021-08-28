import {Component, OnInit} from '@angular/core';
import {PatientService} from './services/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyClinic';

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.patientService.getPatient();
  }

}
