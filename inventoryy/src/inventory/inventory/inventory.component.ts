import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { InventoryService } from '../inventory.service';
import { forkJoin } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';

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
    { text: 'Id', cols: 1, rows: 1, color: 'lightblue' },
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
    this.getRowsFromJSON();
  }

  openInventoryDialog(): void {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      width: '800px',
      data: { id: this.id, name: this.name, gridData: this.gridData },
    });
    console.log('grid', this.gridData);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed1', result);
      if (result)
      {
        this.updateGridQuantity(result.products, result.quantity);
      }
    });
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
      data: {id: this.id, name: this.name}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result)
      {
        this.gridData.push(result);
        result.id = this.genUniqueId();
      }
    });
  }

  updateGridQuantity(resultP: any, resultQ: any) {
    const matchData =  this.gridData.find(g => g.id === resultP);
    if(matchData)
      {
        matchData['quantity'] = isNaN(matchData.quantity * 1) ? 0 : matchData.quantity;
        matchData.quantity = matchData.quantity*1 + resultQ *1;
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
    this.gridData = products.map((p) => {
      const foundInventory = inventory.find((i) => i.productID === p.id); // find inventory if any and store it in foundInventory
      let newObj = JSON.parse(JSON.stringify(p));
      if (foundInventory) {
        newObj['quantity'] = foundInventory.quantity;
      } else {
        newObj['quantity'] = 0;
      }
      return newObj;
    });
  }

  genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify

    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8); // start at index 2 to skip decimal point

    return `${dateStr}-${randomStr}`;
  }

}
