import { Component, Inject, OnInit } from '@angular/core';
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

  loadProducts(): void {
    this.inventoryService.loadProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }
}
