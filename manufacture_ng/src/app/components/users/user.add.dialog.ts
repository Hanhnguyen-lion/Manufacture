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
import { CompanyItem} from '../../models/company';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MustMatch } from '../../helper/must-match.validator';

@Component({
  selector: 'user.add.dialog',
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
  templateUrl: './user.add.dialog.html',
  styleUrl: './user.edit.dialog.css',
  providers:[provideNativeDateAdapter()]
})
export class UserAddDialog implements OnInit {
  
  protected isUpdating = signal(false);

  protected form!: FormGroup;

  protected errorMessage = signal("");

  protected companyItems!: Observable<CompanyItem[]>;

  protected roles: string[] = [
    "Super Admin", "Admin", "User"
  ];

  protected account_types: string[] = [
    "Free", "Member"
  ];

  private api_url:string = `${enviroment.apiUrl}/user`;

  get f() { return this.form?.controls; }

  constructor(
        private svc: BaseService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserAddDialog>) { 
        }

  ngOnInit(): void {
    this.isUpdating.set(false);
    const url = `${enviroment.apiUrl}/company`;
    this.companyItems = this.svc.FindAllItems(url);


    this.form = this.fb.group({
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            password: ["", Validators.required],
            confirm_password: ["", Validators.required],
            email: ["", [
                          Validators.required, 
                          Validators.email]],
            company_id: [null, Validators.required],
            address: [""],
            gender: ["Male"],
            phone: [""],
            role: ["", Validators.required],
            account_type: ["", Validators.required],
            dob: [new Date()]
        }
        ,
        {
          validator: MustMatch('password', 'confirm_password')
      }
    );
  }

  close(){
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid){
      this.isUpdating.set(true);
      var userItem = this.form.value;
      userItem.token = "";
      this.svc.AddItem(this.api_url, userItem).
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

