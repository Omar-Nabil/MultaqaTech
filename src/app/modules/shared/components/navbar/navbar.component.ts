import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private authService:AuthService, private router:Router) {


  }
  logout():void {
    this.authService.logout().subscribe({
      next:(res) => {
        console.log(res);
        localStorage.removeItem("userToken");
        this.authService.userData.next(null);
        this.router.navigate(['/welcome']);
      },
      error:(err) => {
        console.log("Logout error:", err);
        if (err.status === 401) {
          console.log("Unauthorized: Please login again.");
          // Handle unauthorized error, maybe redirect to login page
        } else {
          console.log("An error occurred:", err.error);
        }
      }

    })
  }
}
