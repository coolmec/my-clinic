import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { loadPatients } from 'src/app/actions/patient.actions';
import { selectPatientsTotalFeatureState } from 'src/app/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectPatientsTotalFeatureState)
      .pipe(take(1),tap(num => this.uploadPatients(num)))
        .subscribe();
  }

  uploadPatients(num: number){
    num==0?this.store.dispatch(loadPatients()):null
  }

}
