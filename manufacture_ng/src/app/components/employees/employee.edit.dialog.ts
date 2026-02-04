import { Component, Inject, OnInit, signal } from '@angular/core';
import { 
  MatDialogContent, 
  MatDialogActions, 
  MatDialogModule, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CompanyDepartmentItem, CompanyItem } from '../../models/company';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe } from '@angular/common';
import { DepartmentItem } from '../../models/department';
import { map, Observable } from 'rxjs';
import { EmployeeItem } from '../../models/employee';

@Component({
  selector: 'app-employee.edit.dialog',
  imports: [MatDialogContent, 
            MatButtonModule,
            MatFormFieldModule, 
            FormsModule, 
            MatDialogActions, 
            MatDialogModule, 
            ReactiveFormsModule,
            MatInputModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatDatepickerModule,
            MatRadioModule,
            AsyncPipe],
  templateUrl: './employee.edit.dialog.html',
  styleUrl: './employee.edit.dialog.css',
  providers:[provideNativeDateAdapter()]
})
export class EmployeeEditDialog implements OnInit {
  
  protected isUpdating = signal(false);

  protected errorMessage = signal("");
  
  protected form!: FormGroup;
  protected employeeItem!: EmployeeItem;

  protected id!:string;

  protected companyItems!: Observable<CompanyDepartmentItem[]>;
  protected departmentItems!: DepartmentItem[];

  protected type_of_bloods: string[] = [
    "A", "B", "AB", "O"
  ];

  protected options: string[] = [
    "Yes", "No"
  ];

  private api_url:string = `${enviroment.apiUrl}/employee`;

  get f() { return this.form?.controls; }

  constructor(
        private svc: BaseService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EmployeeEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { 

          this.id = data.id;
          this.employeeItem = data;
        }
  ngOnInit(): void {
    this.isUpdating.set(false);

    var company_id = this.employeeItem.company_id;

    const url = `${enviroment.apiUrl}/company/companies_departments`;
    var company_id = this.employeeItem.company_id;
    this.companyItems = this.svc.FindAllItems(url);

    this.updateDepartment(company_id);

    var licences = (this.employeeItem.licences) ? "Yes": "No";
    var driving_licence = (this.employeeItem.driving_licence) ? "Yes": "No";
    this.form = this.fb.group({
            code: [this.employeeItem.code, Validators.required],
            name: [this.employeeItem.name, Validators.required],
            email: [this.employeeItem.email, Validators.email],
            company_id: [company_id, Validators.required],
            department_id: [{ value: this.employeeItem.department_id, disabled: true }, Validators.required],
            licences: [licences],
            address: [this.employeeItem.address],
            gender: [this.employeeItem.gender],
            phone_number: [this.employeeItem.phone_number],
            driving_licence: [driving_licence],
            place_of_birth: [this.employeeItem.place_of_birth],
            type_of_blood: [this.employeeItem.type_of_blood],
            employment_area: [this.employeeItem.employment_area],
            job_title: [this.employeeItem.job_title],
            date_of_birth: [this.employeeItem.date_of_birth],
            hire_date: [this.employeeItem.hire_date]
        });

        this.form.get('company_id')!.valueChanges.subscribe((companyId: string) => {
          this.updateDepartment(companyId);
        });
  }

  updateDepartment(companyId: string): void {

    var filterItems = this.companyItems?.pipe(
      map(items => items.find(item => item.id === companyId)));

    filterItems.subscribe((data)=>{
      if (data?.departments)
        this.departmentItems! = data?.departments;

      if (companyId) {
        this.form.get('department_id')!.enable();
      } else {
        this.form.get('department_id')!.disable();
        this.form.get('department_id')!.setValue(null);
      }
    })
  }

  close(){
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid){

      this.isUpdating.set(true);

      var employee = this.form.value;

      this.employeeItem = employee;

      this.employeeItem.id = this.id;
      this.employeeItem.licences = (employee.licences == "Yes") ? true : false;
      this.employeeItem.driving_licence = (employee.driving_licence == "Yes") ? true : false;

      this.svc.UpdateItem(this.api_url, this.employeeItem).
      subscribe({
        next:(response)=>{
          if (response.status_code){
            this.isUpdating.set(false);
            this.errorMessage.set(response.detail);
          }
          else{
            this.dialogRef.close();
          }
        }
      })
    }
  }
}
