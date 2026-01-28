import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CompanyAdd } from './company.add';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyDeleteDialog } from './company.delete.dialog';
import { CompanyEditDialog } from './company.edit.dialog';

@Component({
  selector: 'app-company-list',
  imports: [ReactiveFormsModule, MatSortModule, MatTableModule,
            MatIconModule, MatButtonModule, MatFormFieldModule,
            MatInputModule, MatPaginatorModule,
          FormsModule],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css',
})
export class CompanyList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name',
                              'description', 'country',
                              'address', 'email',
                              'phone', 'actions'];
  dataSource = new MatTableDataSource();

  private companies!: Observable<CompanyItem[]>;

  private api_url:string = `${enviroment.apiUrl}/company`;

  form: any;

  constructor(
    private srv: BaseService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){

    // this.form = this.formBuilder.group({
    //   name: ["", Validators.required],
    //   description: [""],
    //   country: [""],
    //   address: [""],
    //   email: ["", Validators.email],
    //   phone: [""],
    //   companyRows: this.formBuilder.array([])
    // });

    this.FindAllCompanies();
  }

  FindAllCompanies(){
    this.companies = this.srv.FindAllItems(this.api_url);
    this.companies.subscribe(items=>{
    // this.form = this.fb.group({
    //           companyRows: this.fb.array(items.map(val => this.fb.group({
    //             id: val.id,
    //             name: new FormControl(val.name),
    //             description: val.description,
    //             country: val.country,
    //             address: val.address,
    //             phone: val.phone,
    //             email: val.email,
    //             action: new FormControl('existingRecord'),
    //             isEditable: new FormControl(true),
    //             isNewRow: new FormControl(false),
    //           })
    //           )) //end of fb array
    //         }); // end of form group cretation

      // this.dataSource.data = (this.form.get('companyRows') as FormArray).controls;


      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
  
    let companyItem = this.srv.FindItemById(this.api_url, id);
    companyItem.subscribe(item =>{
      dialogConfig.data = item;

      const dialogRef = this.dialog.open(CompanyEditDialog, dialogConfig);

      dialogRef.afterClosed().subscribe(
        () => this.FindAllCompanies()
      );
    })
  
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

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    const myCreatedDialogRef = this.dialog.open(CompanyAdd, dialogConfig);

    myCreatedDialogRef.afterClosed().subscribe(
      () => this.FindAllCompanies()
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
