import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reviews_add } from '../interfaces/reviews';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private _HttpClient:HttpClient) { }

  addcomment(review: Reviews_add):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
  return this._HttpClient.post(environment.baseURL+'/api/Courses/Reviews',review,{headers})
}
  deletecomment(id: number,review:Reviews_add):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL + `/api/Courses/Reviews/${id}`, { headers,body:review })
}
  updatecomment(id: number,review:Reviews_add):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL + `/api/Courses/Reviews/${id}`,review ,{ headers})
}
}
