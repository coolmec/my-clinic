/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { loadPatients } from '../actions/patient.actions';
import { SortColumn, SortDirection } from '../directives/ngbdsortableheader.directive';
import { Patient } from '../models/patient.model';
import { selectPatientsListFeatureState } from '../reducers';

interface SearchResult {
	patients: Patient[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(patients: Patient[], column: SortColumn, direction: string): Patient[] {
	if (direction === '' || column === '') {
		return patients;
	} else {
		return [...patients].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(patient: Patient, term: string) {
	return (
		patient.nom.toLowerCase().includes(term.toLowerCase()) ||
		patient.prenom.toLowerCase().includes(term.toLowerCase()) ||
		patient.tel1.toLowerCase().includes(term.toLowerCase()) ||
		patient.tel2.toLowerCase().includes(term.toLowerCase()) ||
		patient.email.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({ providedIn: 'root' })
export class TablePatientService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _patients$ = new BehaviorSubject<Patient[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};
	elements$: Observable<Patient []>; // This will be used as observable of the arraylist of patients

	constructor(private pipe: DecimalPipe, private store: Store) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._patients$.next(result.patients);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get patients$() {
		return this._patients$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		let patients : Patient[] = [];

   		// Connection to the store, to get list of registered patients
    	this.store.dispatch(loadPatients());
		
    	// Selection of the downloaded list of registered patients from the store state
    	this.elements$ = this.store.select(selectPatientsListFeatureState);

		this.elements$.subscribe((values) => {
			patients = values;
		});

		// 1. sort
		patients = sort(patients, sortColumn, sortDirection);

		// 2. filter
		patients = patients.filter((patient) => matches(patient, searchTerm));
		const total = patients.length;

		// 3. paginate
		patients = patients.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ patients, total });
	}
}
