import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  getOrders(DateFrom:string = '', DateTo:string = '', MinPrice:number = 0, MaxPrice:number = 9999999999):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    console.log(`/api/Orders?DateFrom=${DateFrom}&DateTo=${DateTo}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}`);

    return this.httpClient.get(environment.baseURL+`/api/Orders?DateFrom=${DateFrom}&DateTo=${DateTo}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}`,{headers})
  }
}
