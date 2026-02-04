import 
{ 
  AfterViewInit, 
  Component, 
  OnInit, 
  signal, 
  ViewChild 
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseService } from '../../services/base-service';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialog } from '../dialog/delete.dialog';
import { UserEditDialog } from './user.edit.dialog';
import { UserAddDialog } from './user.add.dialog';
import { UserItem } from '../../models/user';


@Component({
  selector: 'app-user-list',
  imports: [
            MatSortModule, 
            MatTableModule,
            MatIconModule, 
            MatButtonModule, 
            MatFormFieldModule,
            MatInputModule, 
            MatPaginatorModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})

export class UserList implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'email', 
    'role', 
    'account_type', 
    'company_name', 
    'actions'];
  dataSource = new MatTableDataSource<any>();

  private users!: Observable<UserItem[]>;
   
  private api_url:string = `${enviroment.apiUrl}/user`;

  loading = signal(false);

  constructor(
    private srv: BaseService,
    private dialog: MatDialog
  ){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.loading.set(false);
    this.LoadData();
  }

  LoadData(){
    this.users = this.srv.FindAllItems(this.api_url);
    this.users.subscribe(items=>{
      this.dataSource.data = items;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading.set(false);
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  startEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
  
    let companyItem = this.srv.FindItemById(this.api_url, id);
    companyItem.subscribe(item =>{
      dialogConfig.data = item;

      const dialogRef = this.dialog.open(
        UserEditDialog, 
        dialogConfig);

      dialogRef.afterClosed().subscribe(
        () => this.LoadData()
      );
    });
  }

  deleteItem(id: string) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: id,
        title: "Delete User",
        content: "Are you sure delete this User ?",
        api_url: this.api_url
    };

    const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.LoadData();
      }
    );
  }

  addNew(){

    const dialogRef = this.dialog.open(UserAddDialog,
      {
        width: "600px"
      }
    );

    dialogRef.afterClosed().subscribe(
      () => this.LoadData()
    );

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
