import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPassword = new FormControl('',  [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*/)]);
  constructor(private _AuthService:AuthService, private _Router:Router, private _ActivatedRoute: ActivatedRoute) {

  }
  userEmail :string =this._ActivatedRoute.snapshot.queryParams['Email'] ;
  userToken:string = this._ActivatedRoute.snapshot.queryParams['Token'];

  setPassword() {
    const value = {
      password:this.forgotPassword.value,
      email: this.userEmail,
      token: this.userToken
    }
    console.log(value);

    this._AuthService.reserPassword(value).subscribe({
      next:(res:any) => {
        console.log(res);
        this._Router.navigate(['/home']);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUser(res);
      },
      error : (err) => console.log(err)
    })
  }


}
