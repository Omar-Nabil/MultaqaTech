import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/modules/courses/services/course.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!:any[];
  TotalPrice:Number = 0;
  constructor(private _CourseService:CourseService) { }

  ngOnInit() {
    this.getCartItems();
    this._CourseService.cartItems.subscribe(newcartItems => {
      this.cartItems = newcartItems;
      console.log(newcartItems);
      this.calcTotalPrice();
    })
  }

  getCartItems() {
    this._CourseService.getBasketItems().subscribe({
      next:(res) => {
        console.log(res);
        this.cartItems = res.basketItems;
        this.calcTotalPrice();
        this._CourseService.cartItems.next(res.basketItems);
      },
      error:(err) => console.log(err)
    })
  }
  calcTotalPrice() {
    this.TotalPrice = 0;
    for(let i=0; i<this.cartItems?.length; i++)
      this.TotalPrice += this.cartItems[i].price;
  }

  deleteItemFromCart(courseId:Number) {
    this._CourseService.RemoveItemFromBasket(courseId).subscribe({
      next:(res) => {
        console.log(res);
        this.cartItems = res.basketItems;
        this._CourseService.cartItems.next(res.basketItems);
        this.calcTotalPrice();
      },
      error:(err) => console.log(err)
    })
  }

  ClearShoppingCart() {
    this._CourseService.ClearShoppingCart().subscribe({
      next:(res) => {
        this.cartItems = res;
        this.calcTotalPrice();
      },
      error:(err) => console.log(err)

    })
  }

}
