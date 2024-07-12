import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  currentUser!: any;
  time:string="";
  constructor(private _AuthService:AuthService){
    this.getCurrentUser();
  }


  getCurrentUser() {
    this._AuthService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
        this._AuthService.currentUser.next(res);
        console.log(this.currentUser)
      }
    })
  }



}
