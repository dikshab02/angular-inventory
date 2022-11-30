import { Component, Inject, OnInit } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('data = ', this.data.gridData);
    this.loadProducts(this.data.gridData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    let productDetails = this.products.find((p: any) => p.id === this.popupForm.value.products)
    productDetails = JSON.parse(JSON.stringify(productDetails))
    productDetails['quantity'] = this.popupForm.value.quantity;
    this.dialogRef.close(productDetails);
  }

  //dropdown list
  loadProducts(gridData?: any[]): void {
    this.products = gridData;
  }
}
