import 
{ 
    ChangeDetectionStrategy, 
    Component, 
    Inject 
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import 
{ 
    MAT_DIALOG_DATA,
    MatDialogActions, 
    MatDialogContent, 
    MatDialogRef, 
    MatDialogTitle 
} from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { enviroment } from "../../enviroments/enviroment";
import { BaseService } from "../../services/base-service";

@Component({
  selector: 'company.delete.dialog',
  templateUrl: 'company.delete.dialog.html',
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogTitle, 
    MatDialogContent,
    MatProgressSpinnerModule
  ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDeleteDialog {
  
  isDeleting = false;
  
  id!: string;
  
  private api_url:string = `${enviroment.apiUrl}/company`;


  constructor(
    private svc:BaseService,
    private dialogRef: MatDialogRef<CompanyDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.id = data.id;
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.isDeleting = true;
    this.svc.DeleteItem(this.api_url, this.id)
    .subscribe(
      {
        next: ()=>{
          this.isDeleting = false;
          this.dialogRef.close();
        }
      }
    )
  }
}