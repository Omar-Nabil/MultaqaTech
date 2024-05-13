import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Meetingscategory} from'src/app/modules/dasdboard/interfaces/meetingscategory'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class MeetingscategoriesService {

  constructor(private _HttpClient: HttpClient) { }


  addcategory(category:Meetingscategory):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/ZoomMeetingCategories',category,{headers})
  }

  getcategories():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/ZoomMeetingCategories',{headers})
  }
  getcategory(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/ZoomMeetingCategories/${id}`,{headers})
  }

  deletecategory(id: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/ZoomMeetingCategories/${id}`,{headers})
  }

  updatecategory(id: number,category:Meetingscategory):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/ZoomMeetingCategories?categoryId=${id}`,category,{headers})
  }
}
