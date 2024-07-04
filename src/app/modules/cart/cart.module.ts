import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { FailedComponent } from './components/failed/failed.component';
import { SuccessComponent } from './components/success/success.component';


@NgModule({
  declarations: [CartComponent, FailedComponent, SuccessComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
