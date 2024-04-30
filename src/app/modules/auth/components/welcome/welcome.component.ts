declare var google:any;
declare var FB:any;

import { Component, NgZone, OnInit } from '@angular/core';
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
  logInError:boolean = false;
  registerError:string = '';
  emailNotExists:boolean = false;
  register:boolean = false;
  fogotPasswordEmail:boolean = false;


  constructor(private _fb:FormBuilder, private _AuthService:AuthService, private _Router:Router,private ngZone: NgZone) {

  }
  ngOnInit(): void {
    main.start();
    this.createLogInForm();
    this.createSignUpForm();
    this.createLogInWithGoogle();
    this.createSignUpWithGoogle();
  }

  // @ts-ignore
  createLogInWithGoogle() {
    google.accounts.id.initialize({
      client_id: '759376708152-ticq2nks3j6uc784r7knbg38cua9gt88.apps.googleusercontent.com',
      callback: (resp:any) => this.handleGoogleLogIn(resp)
    });
    google.accounts.id.renderButton(document.getElementById("googleLogIn"), {
      theme:'outline',
      size:'medium',
      text:'continue_with',
      shape:"rectangle",
      width:100
    });
  }

   handleGoogleLogIn(resp:any) {
    console.log(resp);

    const value = {
      idToken:resp.credential,
      clientId:resp.clientId
    };

    this._AuthService.Google(value).subscribe({
      next:(res) => {
        this._Router.navigate(['/home']);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUser();

        const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
          modalBackdrops.forEach(backdrop => {
            backdrop.classList.add('d-none');
          });

          $('body').css({'overflow':'auto'});
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  // @ts-ignore
  createSignUpWithGoogle() {
    google.accounts.id.initialize({
      client_id: '759376708152-ticq2nks3j6uc784r7knbg38cua9gt88.apps.googleusercontent.com',
      callback: (resp:any) => this.handleGoogleSignUp(resp)
    });
    google.accounts.id.renderButton(document.getElementById("googleSignUp"), {
      theme:'outline',
      size:'medium',
      text:'continue_with',
      shape:"rectangle",
      width:100
    });
  }

   handleGoogleSignUp(resp:any) {
    console.log(resp);

    const value = {
      idToken:resp.credential,
      clientId:resp.clientId
    };

    this._AuthService.Google(value).subscribe({
      next:(res) => {
        this._Router.navigate(['/home']);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUser();

        const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
          modalBackdrops.forEach(backdrop => {
            backdrop.classList.add('d-none');
          });

          $('body').css({'overflow':'auto'});
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  async logInWithFacebook() {

    FB.login(async (result: any) => {
      const value = {
        accessToken : result.authResponse.accessToken
      };
      console.log(result);

      await this._AuthService.Facebook(value).subscribe(
          (x:any) => {
            this.ngZone.run(() => {
              this._Router.navigate(['/home']);
            });
            localStorage.setItem('userToken', x.token);
            this._AuthService.saveUser();
            const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
            modalBackdrops.forEach(backdrop => {
              backdrop.classList.add('d-none');
            });

            $('body').css({'overflow':'auto'});
          },
          (error:any) => {
            console.log(error);
          }
      );
    }, { scope: 'email' });
  }


  createSignUpForm() {
    this.signUpForm = this._fb.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],
      lastName:['', [Validators.required, Validators.minLength(3)]],
      userName:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*/)]],
      rePassword:['', [Validators.required]],
      phoneNumber:['', [Validators.required, Validators.pattern(/^(?:\+?20|0)?1\d{9}$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  createLogInForm() {
    this.logInForm = this._fb.group({
      userNameOrEmail:['', [Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*/)]],
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
    console.log(value);

    this._AuthService.register(value).subscribe({
      next:(res) => {
         this.register = true;
      },
      error:(err) => {
        this.registerError = err.error.errors[0];
        console.log(err);

      }
    })
  }

  handleLogIn(logIn:any) {
    const value = {
      userNameOrEmail: logIn.get('userNameOrEmail')?.value,
      password:  logIn.get('password')?.value
    };
    this._AuthService.logIn(value).subscribe({
      next:(res) => {
        console.log(res);

        const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
        modalBackdrops.forEach(backdrop => {
          backdrop.classList.add('d-none');
        });
         $('body').css({'overflow':'auto'});

        this._Router.navigate(['/home']);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUser();
      },
      error:(err) => {
        this.logInError = true;
        console.log(err);
      }

    })
  }

  fogotPassword(_email:any) {
    const value = {
      email:_email
    }
    this._AuthService.fogotPassword(value).subscribe({
      next:(res) => {
        this.fogotPasswordEmail = true;
        // const modalBackdrops = document.querySelectorAll('.modal-backdrop') as NodeListOf<HTMLElement>;
        // modalBackdrops.forEach(backdrop => {
        //   backdrop.classList.add('d-none');
        // });
      },
      error: (err) => {
        this.emailNotExists = true;
        console.log(err);

      }
    })
  }
}
