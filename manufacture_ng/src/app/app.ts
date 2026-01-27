import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';

export interface EmployeeItem {
  first_name: string;
  last_name: string;
  id: number;
  dob: Date;
}


const ELEMENT_DATA: EmployeeItem[] = [
  {id: 1, first_name: 'Van A', last_name: "Nguyen", dob: new Date('1977-01-01')},
  {id: 2, first_name: 'Van B', last_name: "Nguyen", dob: new Date('2000-01-01')},
  {id: 3, first_name: 'Van C', last_name: "Nguyen", dob: new Date('1999-01-01')},
  {id: 4, first_name: 'Van D', last_name: "Nguyen", dob: new Date('1980-01-01')},
  {id: 5, first_name: 'Van E', last_name: "Nguyen", dob: new Date('1987-01-01')},
  {id: 6, first_name: 'Van F', last_name: "Nguyen", dob: new Date('1950-01-01')},
  {id: 7, first_name: 'Van G', last_name: "Nguyen", dob: new Date('1960-01-01')},
  {id: 8, first_name: 'Van H', last_name: "Nguyen", dob: new Date('1970-01-01')},
  {id: 9, first_name: 'Van I', last_name: "Nguyen", dob: new Date('1990-01-01')},
  {id: 10, first_name: 'Van J', last_name: "Nguyen", dob: new Date('2010-01-01')},
  {id: 11, first_name: 'Thi A', last_name: "Nguyen", dob: new Date('2011-01-01')},
  {id: 12, first_name: 'Thi B', last_name: "Nguyen", dob: new Date('1978-01-01')},
  {id: 13, first_name: 'Thi C', last_name: "Nguyen", dob: new Date('1979-01-01')},
  {id: 14, first_name: 'Thi D', last_name: "Nguyen", dob: new Date('1985-01-01')},
  {id: 15, first_name: 'Thi E', last_name: "Nguyen", dob: new Date('1986-01-01')},
  {id: 16, first_name: 'Thi F', last_name: "Nguyen", dob: new Date('1987-01-01')},
  {id: 17, first_name: 'Thi G', last_name: "Nguyen", dob: new Date('1988-01-01')},
  {id: 18, first_name: 'Thi H', last_name: "Nguyen", dob: new Date('1989-01-01')},
  {id: 19, first_name: 'Thi I', last_name: "Nguyen", dob: new Date('1991-01-01')},
  {id: 20, first_name: 'Thi J', last_name: "Nguyen", dob: new Date('1995-01-01')},
  {id: 21, first_name: 'Thi M', last_name: "Nguyen", dob: new Date('1998-01-01')},
];

@Component({
  selector: 'app-root',
  imports: [DatePipe, MatSortModule, 
            MatTableModule, MatToolbarModule, 
            MatIconModule, MatMenuModule, 
            MatButtonModule, MatFormFieldModule,
            MatInputModule, MatPaginatorModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'dob', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

// constructor(public httpClient: HttpClient,
//               public dialog: MatDialog) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  // @ViewChild(MatSort) sort: MatSort|undefined;
  // @ViewChild('filter',  {static: true}) filter: ElementRef | undefined;
  
  startEdit(i: number, id: number, last_name: string, first_name: string, dob: Date) {
  }

  deleteItem(i: number, id: number, last_name: string, first_name: string, dob: Date) {
  }

  addNew(){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    // this.loadData();
  }
  public loadData() {
    //  this.dataSource = new MatTableDataSource();
    //  this.dataSource.data = ELEMENT_DATA;
    // fromEvent(this.filter?.nativeElement, 'keyup')
    //   // .debounceTime(150)
    //   // .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter?.nativeElement.value;
    //   });
  }
}

// export class ExampleDataSource extends DataSource<EmployeeItem> {
//   _filterChange = new BehaviorSubject('');

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }

//   filteredData: EmployeeItem[] = [];
//   renderedData: EmployeeItem[] = [];

//   constructor(public _exampleDatabase: EmployeeItem[],
//               public _paginator: MatPaginator,
//               public _sort: MatSort) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<EmployeeItem[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page
//     ];


//     return merge(...displayDataChanges).pipe(map( () => {
//         // Filter data
//         this.filteredData = this._exampleDatabase.slice().filter((issue: EmployeeItem) => {
//           const searchStr = (issue.id + issue.first_name + issue.last_name).toLowerCase();
//           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//         });

//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());

//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//         this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
//         return this.renderedData;
//       }
//     ));
//   }

//   disconnect() {}


//   /** Returns a sorted copy of the database data. */
//   sortData(data: EmployeeItem[]): EmployeeItem[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       let propertyA: number | string | Date = '';
//       let propertyB: number | string | Date = '';

//       switch (this._sort.active) {
//         case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
//         case 'first_name': [propertyA, propertyB] = [a.first_name, b.first_name]; break;
//         case 'last_name': [propertyA, propertyB] = [a.last_name, b.last_name]; break;
//         case 'dob': [propertyA, propertyB] = [a.dob, b.dob]; break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
//     });
//   }
// }