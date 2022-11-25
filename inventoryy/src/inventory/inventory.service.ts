import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }
  loadProducts(){
    return this.http.get('./assets/productList.json');
  }

  loadInventory() {
    return this.http.get('./assets/inventoryList.json');
  }

}
