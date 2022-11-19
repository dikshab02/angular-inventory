import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  ɵclearResolutionOfComponentResourcesQueue,
} from '@angular/core';
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
    // this.getColumnsFromJSON(this.mytiles);
    this.getRowsFromJSON();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      width: '800px',
      data: { id: this.id, name: this.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) this.updateGridQuantity(result.products, result.quantity);
    });
  }

  updateGridQuantity(resultP: any, resultQ: any) {
    console.log('this.gridData = ', this.gridData)
    console.log('resultP -> ', resultP);
    console.log('resultQ -> ', resultQ);
    const matchData =  this.gridData.find(g => g.id === resultP);
    console.log("matchData->",matchData);
    if(matchData)
      {
        matchData.quantity = matchData.quantity*1 + resultQ *1;
        console.log(matchData.quantity);
      }
  }


  getRowsFromJSON() {
    let rowList: any[] = [];
    const productFetch = this.inventoryService.loadProducts();
    const inventoryFetch = this.inventoryService.loadInventory();
    forkJoin([productFetch, inventoryFetch]).subscribe(
      ([products, inventory]: any[]) => {
        this.products = products;
        this.inventory = inventory;
        this.generateInventoryData(this.products, this.inventory);
      }
    );
  }

  generateInventoryData(products: any[], inventory: any[]) {
    console.log('generate', products);
    this.gridData = products.map((p) => {
      const foundInventory = inventory.find((i) => i.productID === p.id); // find inventory if any and store it in foundInventory
      let newObj = JSON.parse(JSON.stringify(p));
      if (foundInventory) {
        newObj['quantity'] = foundInventory.quantity;
      } else {
        newObj['quantity'] = 0;
      }
      console.log('this.gridData= ', this.gridData);
      return newObj;
    });
  }
}
