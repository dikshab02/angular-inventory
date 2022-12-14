import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from './add-product/add-product.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [InventoryComponent, AddInventoryComponent, AddProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [InventoryComponent],
})
export class InventoryModule {}
