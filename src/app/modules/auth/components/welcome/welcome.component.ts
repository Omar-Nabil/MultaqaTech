import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import * as main from 'src/main';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  signUpForm!:FormGroup;
  logInForm!:FormGroup;
  error:string = '';
  constructor(private _fb:FormBuilder, private _AuthService:AuthService, private _Router:Router) {

  }
  ngOnInit(): void {
    main.start();

    this.signUpForm = this._fb.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],
      lastName:['', [Validators.required, Validators.minLength(3)]],
      userName:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*/)]],
      rePassword:['', [Validators.required]],
      phoneNumber:['', [Validators.required, Validators.pattern(/^(?:\+?20|0)?1\d{9}$/)]]
    }, { validators: this.passwordMatchValidator });

    this.logInForm = this._fb.group({
      userNameOrEmail:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(3), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*/)]],
    });
  }



  passwordMatchValidator(signUpForm: any){
    let passwordControl = signUpForm.get('password');
    let rePasswordControl = signUpForm.get('rePassword');
    if (passwordControl.value === rePasswordControl.value) {
      return null;
    }
    else {
      rePasswordControl.setErrors({passwordmatch:'repassword must match password'});
      return {passwordmatch:'repassword must match password'};
    }
  }

  handleSignUp(signUp:any) {
    const value = {
      firstName: signUp.get('firstName')?.value,
      lastName:  signUp.get('lastName')?.value,
      userName:  signUp.get('userName')?.value,
      email:  signUp.get('email')?.value,
      phoneNumber:  signUp.get('phoneNumber')?.value,
      password:  signUp.get('password')?.value
    };
    this._AuthService.register(value).subscribe({
      next:(res) => {
        console.log(res);

      },
      error:(err) => console.log(err)
    })
  }

  handleLogIn(logIn:any) {
    this._AuthService.logIn(logIn).subscribe({
      next:(res) => {
        if(res.message === 'success') {
          this._Router.navigate(['/home']);
          localStorage.setItem('userToken', res.token);
          this._AuthService.saveUser();
        } else {
          this.error = res.message;
        }

      },
      error:(err) => console.log(err)

    })
  }
}
