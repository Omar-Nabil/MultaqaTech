import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  PaymentSuccess:boolean = false;

  constructor(private cartService:CartService, private router:Router) { }

  ngOnInit() {
    this.showModal();
    this.cartService.successCheckout().subscribe({
      next:(res) => {
        this.PaymentSuccess = true;

      },
      error:(err) => console.log(err)

    })
  }

  showModal() {
    // Use the DOM API to select the button and simulate a click
    const modalButton = document.getElementById('launchModalButton');
    if (modalButton) {
      modalButton.click();
    } else {
      console.error('Button not found');
    }
  }

  goBackToOrders() {
    const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
          modalBackdrops.forEach(backdrop => {
            backdrop.classList.add('d-none');
          });
        const modalBackdropss = document.querySelectorAll('.modal') as NodeListOf<HTMLElement>;
          modalBackdropss.forEach(backdrop => {
            backdrop.classList.add('d-none');
          });

          $('body').css({'overflow':'auto'});
  }



}
