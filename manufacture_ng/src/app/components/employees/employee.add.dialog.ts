import { Component,  OnInit, signal } from '@angular/core';
import { 
  MatDialogContent, 
  MatDialogActions, 
  MatDialogModule, 
  MatDialogRef} from '@angular/material/dialog';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DepartmentItem } from '../../models/department';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'employee.add.dialog',
  imports: [
    MatButtonModule,
    MatDialogContent, 
    MatFormFieldModule, 
    FormsModule, 
    MatDialogActions, 
    MatDialogModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    AsyncPipe],
  templateUrl: './employee.add.dialog.html',
  styleUrl: './employee.add.dialog.css',
  providers:[provideNativeDateAdapter()]
})
export class EmployeeAddDialog implements OnInit {
  
  protected isUpdating = signal(false);

  protected form!: FormGroup;

  protected errorMessage = signal("");

  protected companyItems!: Observable<CompanyDepartmentItem[]>;
  protected departmentItems!: DepartmentItem[];

  protected type_of_bloods: string[] = [
    "A", "B", "AB", "O"
  ];

  private api_url:string = `${enviroment.apiUrl}/employee`;

  get f() { return this.form?.controls; }

  constructor(
        private svc: BaseService,
        private authService: AuthService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EmployeeAddDialog>) { 
        }

  ngOnInit(): void {
    this.isUpdating.set(false);
    let url = `${enviroment.apiUrl}/company/companies_departments`;
    if (this.authService.userValue && this.authService.userValue.role != "Super Admin"){
      this.companyItems = this.svc.FindAllItems(`${url}/${this.authService.userValue?.company_id}`);
    }
    else{
      this.companyItems = this.svc.FindAllItems(url);
    }
    this.form = this.fb.group({
            code: ["", Validators.required],
            name: ["", Validators.required],
            email: ["", Validators.email],
            licences: ["No"],
            company_id: [null, Validators.required],
            department_id: [{ value: null, disabled: true }, Validators.required],
            address: [""],
            gender: ["Male"],
            phone_number: [""],
            driving_licence: ["No"],
            place_of_birth: [""],
            type_of_blood: ["A"],
            employment_area: [""],
            job_title: [""],
            date_of_birth: [new Date()],
            hire_date: [new Date()]
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
      var employeeItem = this.form.value;

      employeeItem.licences = (employeeItem.licences == "Yes") ? true : false;
      employeeItem.driving_licence = (employeeItem.driving_licence == "Yes") ? true : false;
      this.svc.AddItem(this.api_url, employeeItem).
      subscribe({
        next:(response)=>{
          if (response.status_code){
            this.isUpdating.set(false);
            this.errorMessage.set(response.detail);
          }
          else{
            this.dialogRef.close();
          }
        },
        error:(error)=>{
          this.isUpdating.set(false);
          this.errorMessage.set(error.message);
        }
      });
    }
  }
}
