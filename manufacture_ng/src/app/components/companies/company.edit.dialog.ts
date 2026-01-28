import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CompanyItem } from '../../models/company';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-company.edit.dialog',
  imports: [MatDialogContent, MatFormFieldModule, 
            FormsModule, MatDialogActions, 
            MatDialogModule, ReactiveFormsModule,
            MatInputModule],
  templateUrl: './company.edit.dialog.html',
  styleUrl: './company.edit.dialog.css',
})
export class CompanyEditDialog implements OnInit {
  form!: FormGroup;
  companyItem!: CompanyItem;
  id!:string;

  private api_url:string = `${enviroment.apiUrl}/company`;

  get f() { return this.form?.controls; }

  constructor(
        private svc: BaseService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CompanyEditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { 

          this.id = data.id;
          this.companyItem = data;
        }
  ngOnInit(): void {
    this.form = this.fb.group({
            name: [this.companyItem.name, Validators.required],
            email: [this.companyItem.email, Validators.email],
            country: [this.companyItem.country],
            address: [this.companyItem.address],
            description: [this.companyItem.address],
            phone: [this.companyItem.phone]
        });
  }

  close(){
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid){
      this.companyItem = this.form.value;
      this.companyItem.id = this.id;
      console.log(this.companyItem);
      this.svc.UpdateItem(this.api_url, this.companyItem).
      subscribe({
        next:()=>{
          this.dialogRef.close();
        }
      })
    }
  }
}
