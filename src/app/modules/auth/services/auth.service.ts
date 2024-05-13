import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/Account/GetCurrentUser', {headers});
  }
  addInstructor(value:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/Account/BecomeInstructor',value, {headers});
  }

  saveUser():void {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode:any = jwtDecode(token);
    this.userData.next(decode);
  }

  Facebook(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/FacebookSignIn', value);
  }

  Google(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/GoogleSignIn', value);
  }

  logout():Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    return this._HttpClient.post(environment.baseURL+'/api/Account/logout',{}, {headers});
  }

  confirmEmail(userId: string, code: string): Observable<any> {
    // Construct the URL with query parameters
    const url = `${environment.baseURL}/api/Account/ConfirmEmail`;
    // Create HttpParams object and append the parameters
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('code', code);

    // Send the GET request with the parameters
    return this._HttpClient.get(url, { params });
 }
}
