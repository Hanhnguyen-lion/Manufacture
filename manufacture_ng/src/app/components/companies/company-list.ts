import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  Inject, 
  inject, 
  OnInit, 
  signal, 
  ViewChild 
} from '@angular/core';
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
import { CompanyItem } from '../../models/company';
import { 
  FormsModule, 
  ReactiveFormsModule
} from '@angular/forms';
import { 
  MAT_DIALOG_DATA, 
  MatDialog, 
  MatDialogActions, 
  MatDialogConfig, 
  MatDialogContent, 
  MatDialogModule, 
  MatDialogRef, 
  MatDialogTitle 
} from '@angular/material/dialog';
import { CompanyEditDialog } from './company.edit.dialog';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CompanyAddDialog } from './company.add.dialog';
import { CompanyDeleteDialog } from './company.delete.dialog';

@Component({
  selector: 'app-company-list',
  imports: [
    ReactiveFormsModule, 
    MatSortModule, 
    MatTableModule,
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['code', 
                                'name',
                                'country',
                                'email',
                                'phone', 
                                'actions'];
  dataSource = new MatTableDataSource();

  private companies!: Observable<CompanyItem[]>;

  private api_url:string = `${enviroment.apiUrl}/company`;

  loading = signal(false);

  constructor(
    private srv: BaseService,
    private dialog: MatDialog
  ){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loading.set(false);
    this.FindAllCompanies();
  }

  FindAllCompanies(){
    this.loading.set(true);
    this.companies = this.srv.FindAllItems(this.api_url);

    this.companies.subscribe(items=>{
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    this.loading.set(false);
    });

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  startEdit(id: string) {
    console.log("id:", id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
  
    let companyItem = this.srv.FindItemById(this.api_url, id);
    companyItem.subscribe(item =>{
      dialogConfig.data = item;

      const dialogRef = this.dialog.open(CompanyEditDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(
        () => this.FindAllCompanies()
      );
    });
  
  }

  deleteItem(id: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: id,
        title: 'Delete Company'
    };

    const dialogRef = this.dialog.open(CompanyDeleteDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => this.FindAllCompanies()
    );
  }

  addNew(){

    const dialogRef = this.dialog.open(CompanyAddDialog);

    dialogRef.afterClosed().subscribe(
      () => this.FindAllCompanies()
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


