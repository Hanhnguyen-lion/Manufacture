import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { CompanyItem } from '../../models/company';
import { BaseService } from '../../services/base-service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-company.add',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './company.add.html',
  styleUrl: './company.add.css'
})
export class CompanyAdd {
  constructor(public dialogRef: MatDialogRef<CompanyAdd>,
              @Inject(MAT_DIALOG_DATA) public data: CompanyItem,
              public svc: BaseService) { }

  formControl = new FormControl('', [
    Validators.required,
     Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    //this.dataService.addIssue(this.data);
  }
  
}
