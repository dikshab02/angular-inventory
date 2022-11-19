import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { DialogData } from '../inventory/inventory.component';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
  products: any = [];
  selectedValue = '';

  popupForm = new FormGroup({
    products: new FormControl<string>(''),
    quantity: new FormControl<string>('')
  });

  constructor(
    public dialogRef: MatDialogRef<AddInventoryComponent>,
    public inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close(this.popupForm.value);
  }

  loadProducts(): void {
    this.inventoryService.loadProducts().subscribe((products) => {
      this.products = products;
      console.log("hello->",this.products);
    });
  }
}
