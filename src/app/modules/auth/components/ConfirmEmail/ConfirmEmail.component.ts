import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ConfirmEmail',
  templateUrl: './ConfirmEmail.component.html',
  styleUrls: ['./ConfirmEmail.component.css']
})
export class ConfirmEmailComponent implements OnInit {

   @ViewChild('confirmModal') confirmModal!: ElementRef;
  userId :string =this.activatedRoute.snapshot.queryParams['userId'] ;
  code:string = this.activatedRoute.snapshot.queryParams['code'];
  constructor(private authService:AuthService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.confirmEmail(this.userId, this.code).subscribe({
      next: (res) => {
        console.log(res);
        this.showModal();
      },
      error: (err) => console.log(err)
    });
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

}
