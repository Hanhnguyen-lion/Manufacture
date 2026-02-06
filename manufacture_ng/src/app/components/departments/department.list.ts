import { 
  AfterViewInit, 
  ChangeDetectionStrategy, 
  Component, 
  OnInit, 
  signal, 
  ViewChild } from '@angular/core';
import { 
  AbstractControl,
  FormArray, 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators } from '@angular/forms';
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
import { map, Observable } from 'rxjs';
import { DepartmentItem } from '../../models/department';
import { enviroment } from '../../enviroments/enviroment';
import { BaseService } from '../../services/base-service';
import { MatSelectModule } from '@angular/material/select';
import { CompanyItem } from '../../models/company';
import { AsyncPipe } from '@angular/common';
import { 
  MatDialog, 
  MatDialogConfig 
} from '@angular/material/dialog';
import { DeleteDialog } from '../dialog/delete.dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';


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
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AsyncPipe  
  ],
  templateUrl: './department.list.html',
  styleUrl: './department.list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DepartmentList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name',
                                'phone', 
                                'company_name', 
                                'actions'];
  dataSource = new MatTableDataSource<any>();
  form!: FormGroup;
  errorMessage = signal("");

  formArray!: FormArray;
  private items!: Observable<DepartmentItem[]>;
  companies!: Observable<CompanyItem[]>;

  private api_url:string = `${enviroment.apiUrl}/department`;

  loading = signal(false);

  constructor(
    private srv: BaseService,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ){
    this.form = this.fb.group({
      tableRows: this.fb.array([])
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(){
    this.loading.set(false);
    let url = `${enviroment.apiUrl}/company`;
    if (this.authService.userValue && this.authService.userValue.role != "Super Admin"){
      this.companies = this.srv.FindAllItems(`${url}/companies/${this.authService.userValue?.company_id}`);
    }
    else{
      this.companies = this.srv.FindAllItems(url);
    }

    this.LoadData();
  }

  LoadData(){
    this.loading.set(true);
    this.items = this.srv.FindAllItems(this.api_url);
    if (this.authService.userValue && this.authService.userValue.role != "Super Admin"){
      this.items = this.items.pipe(
        map((arr: any[]) =>{
          return arr.filter((item)=> item.company_id == this.authService.userValue?.company_id)
        })
      )
    }

    this.items.subscribe(data=>{
      data.forEach(element=>{
        this.addTableRow(element);
      });

      this.formArray = this.fb.array(data.map(item => this.createFormGroup(item)));
      this.dataSource.data = this.tableRows.controls; // Bind the FormArray controls to the MatTableDataSource
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const filterPredicate = this.dataSource.filterPredicate;
      this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
        return filterPredicate.call(this.dataSource, data.value, filter);
      }

      this.loading.set(false);
    });

  }

  get tableRows(): FormArray {
    return this.form.get('tableRows') as FormArray;
  }

  addTableRow(data: DepartmentItem) {
    const row = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      phone: [data.phone],
      company_id: [data.company_id],
      company_name: [data.company_name],
      isEdit: [false] // Control the edit state of the row
    });
    this.tableRows.push(row);
  }

  saveRow(row: FormGroup) {
    if (row.valid) {
      this.loading.set(true);;
      // Here you would typically call an API to save the data
      //console.log('Saving row:', row.value);
      let item = row.value;
      const company_id = item?.company_id??"";
      if (row.get("id")){

        this.srv.UpdateItem(this.api_url, {
          id: item.id,
          name: item.name,
          phone: item.phone,
          company_id: company_id
        }).
        subscribe({
          next:(response)=>{
            if (response.status_code){
              this.loading.set(false);
              
              this.errorMessage.set(response.detail);
            }
            else{
              //var company_id = response.company_id;
              var item = this.companies.pipe(
                map(items => items.find(
                  (item) => item.id == company_id))
              );
              item?.subscribe({
                next:(data:any)=>{
                  row.get('company_name')?.setValue(data.name);
                  this.loading.set(false);
                }
              });
              row.get('isEdit')?.patchValue(false);
            }
          }
        });
      }
      else{
        this.srv.AddItem(this.api_url, {
          name: item.name,
          phone: item.phone,
          company_id: company_id
        }).
        subscribe({
          next:(response)=>{
            if (response.status_code){
              this.loading.set(false);
              
              this.errorMessage.set(response.detail);
            }
            else{
              row.get('id')?.setValue(response.id);
              var item = this.companies.pipe(
                map(items => items.find(
                  (item) => item.id == company_id))
              );
              item?.subscribe({
                next:(data:any)=>{
                  row.get('company_name')?.setValue(data.name);
                  this.loading.set(false);
                }
              });
              row.get('isEdit')?.patchValue(false);
            }
          }
        });
      }
    }
  }

  // Function to cancel changes (reverts the form group to its initial state)
  cancelRow(row: FormGroup) {
    if (row.get("id")){
      row.get('isEdit')?.patchValue(false);
    }
    else{
      this.formArray.removeAt(this.formArray.length - 1);
      this.dataSource.data = this.formArray.controls as FormGroup[];      
    }
    //this.edit(row);
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (control: AbstractControl, sortHeaderId: string) => {
      const value: any = control.value[sortHeaderId];
      return typeof value === 'string' ? value.toLowerCase() : value;
    };    
  }

  edit(row: FormGroup) {
    row.get('isEdit')?.setValue(!row.get('isEdit')?.value);
  }

  delete(row: FormGroup) {
    let id = row.get("id")?.value;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: id,
        title: "Delete Department",
        content: "Are you sure delete this department ?",
        api_url: this.api_url
    };

    const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        (this.form.get('tableRows') as FormArray).clear();
        this.LoadData();
      }
    );
  }

  addNew(){

    const row = this.fb.group({
      name: ["", Validators.required],
      phone: [""],
      company_id: [""],
      company_name: [""],
      isEdit: [true] // Control the edit state of the row
    });
    this.tableRows.push(row);
    this.dataSource.data = this.tableRows.controls;

    // const newRow = this.createFormGroup(
    //   { 
    //     id:"",
    //     name: "", 
    //     phone: "", 
    //     company_id: "",
    //     company_name: ""
    //   });
    //  newRow.get('isEdit')?.setValue(true); // Automatically open in edit mode
    //  this.formArray.push(newRow);
     //this.dataSource.data = this.formArray.controls as FormGroup[];   

  }

  createFormGroup(data: DepartmentItem): FormGroup {
    return this.fb.group({
      name: [data.name, Validators.required],
      phone: [data.phone],
      company_name: [data.company_name],
      isEdit: [false] // Custom property to track edit state
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
