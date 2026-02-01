import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
/**
 * @title Dialog Animations
 */
@Component({
  selector: 'dialog-animations-example',
  styleUrl: 'dialog-animations-example.css',
  templateUrl: 'dialog-animations-example.html',
  imports: [
    MatButtonModule, 
    MatFormField,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExample  implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<any>(); // Use any with FormArray approach
  form: FormGroup;
  formArray!: FormArray;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tableRows: this.fb.array([])
    });
  }

  ngOnInit() {
    this.setInitialData();
    this.formArray = this.fb.array(ELEMENT_DATA.map(item => this.createFormGroup(item)));
    this.dataSource.data = this.tableRows.controls; // Bind the FormArray controls to the MatTableDataSource
  }

  setInitialData() {
    ELEMENT_DATA.forEach(element => {
      this.addTableRow(element);
    });
  }

  addTableRow(data: PeriodicElement) {
    const row = this.fb.group({
      position: [data.position],
      name: [data.name, Validators.required],
      weight: [data.weight, Validators.required],
      symbol: [data.symbol, Validators.required],
      isEdit: [false] // Control the edit state of the row
    });
    this.tableRows.push(row);
  }

  get tableRows(): FormArray {
    return this.form.get('tableRows') as FormArray;
  }

  addNew(){
    const newRow = this.createFormGroup({ position: 0, name: '', weight: 0, symbol: '' });
    newRow.get('isEdit')?.setValue(true); // Automatically open in edit mode
    this.formArray.push(newRow);
    this.dataSource.data = this.formArray.controls as FormGroup[];   
  }
  // Helper function to toggle edit mode
  toggleEditMode(row: FormGroup) {
    row.get('isEdit')?.setValue(!row.get('isEdit')?.value);
  }

  createFormGroup(data: PeriodicElement): FormGroup {
    return this.fb.group({
      position: [data.position, Validators.required],
      name: [data.name, Validators.required],
      weight: [data.weight, Validators.required],
      symbol: [data.symbol, Validators.required],
      isEdit: [false] // Custom property to track edit state
    });
  }

  deleteRow(index: number): void {
    this.formArray.removeAt(index);
    this.dataSource.data = this.formArray.controls as FormGroup[]; // Refresh table view
    // Logic to call API to delete from backend
  }

  // Function to save changes
  saveRow(row: FormGroup) {
    if (row.valid) {
      // Here you would typically call an API to save the data
      console.log('Saving row:', row.value);
      this.toggleEditMode(row);
    }
  }

  // Function to cancel changes (reverts the form group to its initial state)
  cancelRow(row: FormGroup) {
    this.toggleEditMode(row);
  }
}