import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';
import {ModalEditComponent} from '../../modal-edit/modal-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss']
})
export class ListPatientsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, {static: true}) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', {static: true}) row: ElementRef;

  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle', 'command'];

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService) {
  }

  ngOnInit(): void {
    for (let i = 1; i <= 25; i++) {
      this.elements.push({id: i.toString(), first: 'User ' + i, last: 'Last ' + i, handle: 'Handle ' + i});
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(8);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  editRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: any) => {
      this.elements[elementIndex] = newElement;
    });
    this.mdbTable.setDataSource(this.elements);
  }

  removeRow(el: any): void {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.mdbTable.removeRow(elementIndex);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.mdbTable.setDataSource(this.elements);
  }
}
