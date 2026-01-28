import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from '../../services/base-service';
import { enviroment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-company.delete.dialog',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './company.delete.dialog.html',
  styleUrl: './company.delete.dialog.css',
})
export class CompanyDeleteDialog {

  id!:string;

  private api_url:string = `${enviroment.apiUrl}/company`;

  constructor(
    private svc:BaseService,
    private dialogRef: MatDialogRef<CompanyDeleteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.id = data.id;
    console.log("this.id: ", this.id);
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.svc.DeleteItem(this.api_url, this.id).subscribe(
      {
        next: ()=>{
          this.dialogRef.close();
        }
      }
    );
  }

}
