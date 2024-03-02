import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  register(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/register', value);
  }
  logIn(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/login', value);
  }
  fogotPassword(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/forgetPassword', value);
  }
  reserPassword(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/ResetPassword', value);
  }

  saveUser():void {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode:any = jwtDecode(token);
    this.userData.next(decode);
  }
}
