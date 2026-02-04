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
import { CompanyItem } from '../../models/company';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserItem } from '../../models/user';
import { MustMatch } from '../../helper/must-match.validator';

@Component({
  selector: 'app-user.edit.dialog',
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
  templateUrl: './user.edit.dialog.html',
  styleUrl: './user.edit.dialog.css',
  providers:[provideNativeDateAdapter()]
})
export class UserEditDialog implements OnInit {
  
  protected isUpdating = signal(false);

  protected errorMessage = signal("");
  
  protected form!: FormGroup;
  protected userItem!: UserItem;

  protected id!:string;


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
        private dialogRef: MatDialogRef<UserEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { 

          this.id = data.id;
          this.userItem = data;
        }
  ngOnInit(): void {
    this.isUpdating.set(false);

    var company_id = this.userItem.company_id;

    const url = `${enviroment.apiUrl}/company`;
    this.companyItems = this.svc.FindAllItems(url);

    this.form = this.fb.group({
            first_name: [this.userItem.first_name, Validators.required],
            last_name: [this.userItem.last_name, Validators.required],
            password: [this.userItem.password, Validators.required],
            confirm_password: [this.userItem.password, Validators.required],
            email: [this.userItem.email, [
                          Validators.required, 
                          Validators.email]],
            company_id: [company_id, Validators.required],
            address: [this.userItem.address],
            gender: [this.userItem.gender],
            phone: [this.userItem.phone],
            role: [this.userItem.role, Validators.required],
            account_type: [this.userItem.account_type, Validators.required],
            dob: [this.userItem.dob]
        },
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

      var user = this.form.value;

      this.userItem = user;

      this.userItem.id = this.id;
      this.userItem.token = "";

      this.svc.UpdateItem(this.api_url, this.userItem).
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
