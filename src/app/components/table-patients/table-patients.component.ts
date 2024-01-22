import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { Patient } from '../../models/patient.model';
import { TablePatientService } from '../../services/table-patient.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, SortEvent } from '../../directives/ngbdsortableheader.directive';

@Component({
  selector: 'app-table-patients',
	standalone: true,
	imports: [
		NgFor,
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		NgIf,
	],
  templateUrl: './table-patients.component.html',
  styleUrls: ['./table-patients.component.scss'],
	providers: [TablePatientService, DecimalPipe],
})
export class TablePatientsComponent {

	patients$: Observable<Patient[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	constructor(public service: TablePatientService) {
		this.patients$ = service.patients$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
}
