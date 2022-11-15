import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { InventoryService } from '../inventory.service';
import { forkJoin } from 'rxjs';

export interface DialogData {
  name: string;
  id: string;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  id: string | undefined;
  name: string | undefined = 'Add Inventory';
  mytiles: Tile[] = [
    { text: 'Name', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Description', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Measure Unit', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Image Url', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Quantity', cols: 1, rows: 1, color: 'lightblue' },
  ];
  products: any[] = [];
  inventory: any[] = [];
  gridData: any[] = [];

  constructor(
    public dialog: MatDialog,
    public inventoryService: InventoryService
  ) {}
  ngOnInit(): void {
    this.getColumnsFromJSON(this.mytiles);
    this.getRowsFromJSON();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      width: '800px',
      data: { id: this.id, name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

  getColumnsFromJSON(data: any) {
    let columnList: any[] = [];

    // Create columns
    data.forEach((obj: any) => {
      let column = Object.assign({ headerAlignment: 'center' }, obj);

      columnList.push(column);
      console.log(column, columnList);
    });

    return columnList;
  }

  getRowsFromJSON() {
    let rowList: any[] = [];
    const productFetch = this.inventoryService.loadProducts();
    const inventoryFetch = this.inventoryService.loadInventory();
    forkJoin([productFetch, inventoryFetch]).subscribe(
      ([products, inventory]: any[]) => {
        this.products = products;
        this.inventory = inventory;
        console.log('products', products);
        console.log('inventory', inventory);
        this.generateInventoryData(this.products, this.inventory);
      }
    );
  }

  generateInventoryData(products: any[], inventory: any[]) {
    console.log('generate', products);
    this.gridData = [];
    // this.gridData = products.map(p => {
    //   console.log("generate p", products);
    //   const foundInventory = inventory.find(i => i.productID === p.id)
    for (let p = 0; p < products.length; p++) {
      let inv = null;
      // find inventory if any and store it in inv
      for (let i = 0; i < inventory.length; i++) {
        if (products[p].id == inventory[i].productID) inv = inventory[i];
      }
      // create a new object which is exact copy of product[p]
      let newObj = JSON.parse(JSON.stringify(products[p])) // copy by value not by reference
      if (inv) {
        // add quantity
        newObj['quantity'] = inv.quantity;
      } else {
        // add qty as 0
        newObj['quantity'] = 0;
      }
      this.gridData.push(newObj);
    }
    console.log('this.gridData = ', this.gridData);
    // if(p.id === inventory.find(i => {
    //   i.productID
    //   newObj.name = p.name;
    //   console.log("generate name", newObj.name);
    //   newObj.description = p.description;
    //   newObj.measureUnit = p.measureUnit;
    //   newObj.image = p.imageUrl;
    //   console.log("generate newobj", newObj.name);
    //   if(p.id === i.productID)
    //   {

    //     if(i.quantity === '')
    //       newObj.quantity = 0;
    //       else
    //       newObj.quantity = i.quantity;
    //   }
    //   else
    //   {
    //     newObj.quantity = 0;
    //   }

    // console.log(newObj);
    // return newObj;
  }
}
