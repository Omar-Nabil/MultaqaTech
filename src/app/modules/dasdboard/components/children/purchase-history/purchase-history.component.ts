import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent {
  orders:any[] = [];
  filterForm!:FormGroup;
  constructor(private ordersService:OrdersService, private _fb:FormBuilder) {
    this.ordersService.getOrders().subscribe({
      next:(res) => {
        console.log(res);
        this.orders = res;
        console.log(res[0].basket.basketItems);

      },
      error:(err) => console.log(err)

    })

    this.filterForm = this._fb.group({
      MinPrice:[''],
      MaxPrice:[''],
      DateFrom:[''],
      DateTo:['']
    })
  }

  applyFilter() {
    const formData = new FormData();
    formData.append('MinPrice', this.filterForm.get('MinPrice')?.value);
    formData.append('MaxPrice', this.filterForm.get('MaxPrice')?.value);
    formData.append('DateFrom', this.filterForm.get('DateFrom')?.value);
    formData.append('DateTo', this.filterForm.get('DateTo')?.value);
    console.log(formData);

    this.ordersService.getOrders(this.filterForm.get('DateFrom')?.value ? this.filterForm.get('DateFrom')?.value : '', this.filterForm.get('DateTo')?.value? this.filterForm.get('DateTo')?.value : '', this.filterForm.get('MinPrice')?.value? this.filterForm.get('MinPrice')?.value : 0, this.filterForm.get('MaxPrice')?.value? this.filterForm.get('MaxPrice')?.value : 999999).subscribe({
      next:(res) => {
        console.log(res);
        this.orders = res;
        console.log(res[0].basket.basketItems);
      },
      error:(err) => console.log(err)

    })
  }

  formatDate(dateString:string):string {
    let publishingDate = new Date(dateString);
    return `${publishingDate.getFullYear()}-${String(publishingDate.getMonth() + 1).padStart(2, '0')}-${String(publishingDate.getDate()).padStart(2, '0')} ${publishingDate.getHours()}:${publishingDate.getMinutes().toString().padStart(2, '0')}`;
  }

}
