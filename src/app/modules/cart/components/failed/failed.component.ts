import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.showModal();
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
