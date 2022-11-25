import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public unitList: string[] =
    ['kilogram','litre','gram','millilitre','centimetre','metre'];
    
  constructor() { }

}
