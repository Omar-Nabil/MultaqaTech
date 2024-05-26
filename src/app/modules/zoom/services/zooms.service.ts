import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ZoomsService {

  constructor(private _HttpClient:HttpClient) { }


  postMeeting(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/ZoomMeeting', data, {headers})
  }

  editMeeting(data:any, id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/ZoomMeeting/'+id, data, {headers})
  }

  deleteMeeting(id:string):Observable<any> {
    const headers = new HttpHeaders({
     'Authorization': `Bearer ${localStorage.getItem('userToken')}`
   });
   return this._HttpClient.delete(environment.baseURL+'/api/ZoomMeeting/'+id, {headers});
 }

 getCategories():Observable<any> {
  const headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
  return this._HttpClient.get(environment.baseURL+'/api/ZoomMeetingCategories',{headers})
 }
 getMeetingDetailes(id:string):Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  });
  return this._HttpClient.get(environment.baseURL+'/api/ZoomMeeting/'+id, {headers});
 }
 getMeetings():Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  });
  return this._HttpClient.get(environment.baseURL+'/api/ZoomMeeting/', {headers});
 }
}
