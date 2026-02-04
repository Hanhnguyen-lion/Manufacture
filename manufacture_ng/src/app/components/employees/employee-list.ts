import 
{ 
  AfterViewInit, 
  Component, 
  OnInit, 
  signal, 
  ViewChild 
} from '@angular/core';
import { EmployeeItem } from '../../models/employee';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialog } from '../dialog/delete.dialog';
import { EmployeeEditDialog } from './employee.edit.dialog';
import { EmployeeAddDialog } from './employee.add.dialog';


@Component({
  selector: 'app-employee-list',
  imports: [
            MatSortModule, 
            MatTableModule,
            MatIconModule, 
            MatButtonModule, 
            MatFormFieldModule,
            MatInputModule, 
            MatPaginatorModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})

export class EmployeeList implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'code', 
    'name', 
    'job_title', 
    'department_name', 
    'company_name', 
    'actions'];
  dataSource = new MatTableDataSource<any>();

  private employees!: Observable<EmployeeItem[]>;
   
  private api_url:string = `${enviroment.apiUrl}/employee`;

  loading = signal(false);

  constructor(
    private srv: BaseService,
    private dialog: MatDialog
  ){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loading.set(false);
    this.FindAllEmployees();
  }

  FindAllEmployees(){
    this.employees = this.srv.FindAllItems(this.api_url);
    this.employees.subscribe(items=>{
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading.set(false);
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  startEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
  
    let companyItem = this.srv.FindItemById(this.api_url, id);
    companyItem.subscribe(item =>{
      dialogConfig.data = item;

      const dialogRef = this.dialog.open(
        EmployeeEditDialog, 
        dialogConfig);

      dialogRef.afterClosed().subscribe(
        () => this.FindAllEmployees()
      );
    });
  }

  deleteItem(id: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: id,
        title: "Delete Employee",
        content: "Are you sure delete this Employee ?",
        api_url: this.api_url
    };

    const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.FindAllEmployees();
      }
    );
  }

  addNew(){

    const dialogRef = this.dialog.open(EmployeeAddDialog,
      {
        width: "600px"
      }
    );

    dialogRef.afterClosed().subscribe(
      () => this.FindAllEmployees()
    );

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
