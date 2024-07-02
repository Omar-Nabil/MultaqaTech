import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {Eventcatigory} from'src/app/modules/dasdboard/interfaces/eventcatigory'

@Injectable({
  providedIn: 'root'
})
export class EventscategoriesService {

  constructor(private _HttpClient: HttpClient) { }
  addEventCategory(category:Eventcatigory):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/EventCategories',category,{headers})
  }
  getEventCategories():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/EventCategories',{headers})
  }
  getEventCategory(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/EventCategories/${id}`,{headers})
  }
  deleteEventCategory(id: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/EventCategories/${id}`,{headers})
  }

  updateEventCategory(id: number,category:Eventcatigory):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/EventCategories?categoryId=${id}`,category,{headers})
  }
}
