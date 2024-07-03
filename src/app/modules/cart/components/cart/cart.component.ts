import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { CartService } from '../../services/cart.service';
declare var Stripe: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!:any[];
  TotalPrice:Number = 0;
  constructor(private _CourseService:CourseService, private cartService:CartService) { }

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
    console.log(courseId);

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
        this._CourseService.cartItems.next(res);
        this.calcTotalPrice();
      },
      error:(err) => console.log(err)

    })
  }

  Checkout() {
    this.cartService.Checkout().subscribe({
      next:(res) => {
        console.log(res);
        // this.TotalPrice = 0;
        // this.cartItems = [];
        // this._CourseService.cartItems.next([]);
        this.stripecheckout(res.publishableKey, res.sessionId);
      },
      error:(err) => console.log(err)

    })
  }

  stripecheckout(pubKey:any, sessionId:any) {
    const stripe = Stripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
  }

}
