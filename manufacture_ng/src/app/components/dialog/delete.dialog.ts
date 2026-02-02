import { 
  ChangeDetectionStrategy, 
  Component, 
  Inject, 
  signal} from '@angular/core';
import { 
  MatDialogContent, 
  MatDialogActions, 
  MAT_DIALOG_DATA, 
  MatDialogRef,
  MatDialogTitle} from "@angular/material/dialog";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BaseService } from '../../services/base-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete.dialog',
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogTitle, 
    MatDialogContent,
    MatProgressSpinnerModule
  ],
  templateUrl: './delete.dialog.html',
  styleUrl: './delete.dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialog {

  isDeleting = signal(false);

  id!: string;
  api_url!:string;
  title!:string;
  content!:string;

  constructor(
    private srv: BaseService,
    private dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.id = data.id;
    this.api_url = data.api_url;
    this.title = data.title;
    this.content = data.content;
  }

  close(){
    this.dialogRef.close();
  }

  save(){
    this.isDeleting.set(true);
    this.srv.DeleteItem(this.api_url, this.id)
    .subscribe(
      {
        next: (response)=>{
          this.isDeleting.set(false);
          this.dialogRef.close();
        }
      }
    )
  }
}
