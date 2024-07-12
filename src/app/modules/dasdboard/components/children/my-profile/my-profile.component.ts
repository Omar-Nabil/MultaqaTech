import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DatePipe } from '@angular/common'; // Import DatePipe


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [DatePipe]
})
export class MyProfileComponent {
  currentUser!: any;
  formattedRegistrationDate: string  | null = null;

  constructor(private _AuthService:AuthService , private datePipe: DatePipe){
    this.getCurrentUser();
  }


  getCurrentUser() {
    this._AuthService.getCurrentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
        this._AuthService.currentUser.next(res);
        console.log(this.currentUser)
        if (res.registrationDate) {
          // Format registrationDate using DatePipe
          this.formattedRegistrationDate = this.datePipe.transform(res.registrationDate, 'medium');
        } else {
          this.formattedRegistrationDate = null; // Handle null case
        }


      }
    })
  }



}
