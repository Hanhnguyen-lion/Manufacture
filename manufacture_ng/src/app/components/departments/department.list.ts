import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  OnInit, 
  signal, 
  ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { 
  MatPaginator, 
  MatPaginatorModule 
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { DepartmentItem } from '../../models/department';
import { enviroment } from '../../enviroments/enviroment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BaseService } from '../../services/base-service';

@Component({
  selector: 'app-department.list',
  imports: [
    MatSortModule, 
    MatTableModule,
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule    
  ],
  templateUrl: './department.list.html',
  styleUrl: './department.list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name',
                                'phone', 
                                'company_id', 
                                'actions'];
  dataSource = new MatTableDataSource();

  private items!: Observable<DepartmentItem[]>;

  private api_url:string = `${enviroment.apiUrl}/department`;

  loading = signal(false);

  constructor(
    private srv: BaseService,
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loading.set(false);
    this.LoadData();
  }

  LoadData(){
    this.loading.set(true);
    this.items = this.srv.FindAllItems(this.api_url);

    this.items.subscribe(data=>{
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading.set(false);
    });

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(id: string) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
  
    // let companyItem = this.srv.FindItemById(this.api_url, id);
    // companyItem.subscribe(item =>{
    //   dialogConfig.data = item;

    //   const dialogRef = this.dialog.open(CompanyEditDialog, dialogConfig);

    //   dialogRef.afterClosed().subscribe(
    //     () => this.LoadData()
    //   );
    // });
  
  }

  delete(id: string) {

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //     id: id
    // };

    // const dialogRef = this.dialog.open(CompanyDeleteDialog, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //   () => this.LoadData()
    // );
  }

  addNew(){

    // const dialogRef = this.dialog.open(CompanyAddDialog);

    // dialogRef.afterClosed().subscribe(
    //   () => this.LoadData()
    // );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
