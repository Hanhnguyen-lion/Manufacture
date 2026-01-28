import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeItem } from '../../models/employee';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseService } from '../../services/base-service';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';


@Component({
  selector: 'app-employee-list',
  imports: [DatePipe, MatSortModule, MatTableModule,
            MatIconModule, MatButtonModule, MatFormFieldModule,
            MatInputModule, MatPaginatorModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})

export class EmployeeList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'job_title', 'date_of_birth', 'hire_date', 'actions'];
  dataSource = new MatTableDataSource<EmployeeItem>();

  private employees!: Observable<EmployeeItem[]>;
   
  private api_url:string = `${enviroment.apiUrl}/employee`;

  constructor(
    private srv: BaseService,
  ){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.FindAllEmployees();
  }

  FindAllEmployees(){
    this.employees = this.srv.FindAllItems(this.api_url);
    this.employees.subscribe(items=>{
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
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

}
