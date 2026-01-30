import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CompanyItem } from '../../models/company';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'company.add.dialog',
  imports: [
    MatButtonModule,
    MatDialogContent, 
    MatFormFieldModule, 
    FormsModule, 
    MatDialogActions, 
    MatDialogModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule],
  templateUrl: './company.add.dialog.html',
  styleUrl: './company.add.dialog.css'
})
export class CompanyAddDialog implements OnInit {
  
  isUpdating = signal(false);

  form!: FormGroup;

  errorMessage = signal("");
  
  companyItem!: CompanyItem;

  private api_url:string = `${enviroment.apiUrl}/company`;

  get f() { return this.form?.controls; }

  constructor(
        private svc: BaseService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CompanyAddDialog>) { 
        }

  ngOnInit(): void {
    this.isUpdating.set(false);
    this.form = this.fb.group({
            code: ["", Validators.required],
            name: ["", Validators.required],
            email: ["", Validators.email],
            country: [""],
            address: [""],
            description: [""],
            phone: [""]
        });
  }

  close(){
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid){
    this.isUpdating.set(true);
      this.companyItem = this.form.value;
      this.svc.AddItem(this.api_url, this.companyItem).
      subscribe({
        next:(response)=>{
          this.isUpdating.set(false);
          this.dialogRef.close();
        },
        error:(error)=>{
          this.isUpdating.set(false);
          this.errorMessage.set(error.message);
        }
      });
    }
  }
}
