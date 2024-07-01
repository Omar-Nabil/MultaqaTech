import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {

  constructor(private _HttpClient:HttpClient) { }
  getCurrentPage(pageNumber: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+"/api/Event?PageIndex="+pageNumber, {headers});
  }
  eventsSearch(text:string, pageNumber: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Event?Search='+text+"&PageIndex="+pageNumber, {headers});
  }
  getCategories():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/EventCategories', {headers});
  }
  getCountries():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/EventCountries', {headers});
  }
  filterByCategoryId(catId:number, pageNumber: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Event?categoryId='+catId+"&PageIndex="+pageNumber, {headers});
  }
  filterByCountryId(catId:number, pageNumber: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Event?countryId='+catId+"&PageIndex="+pageNumber, {headers});
  }
  getEventDetailes(id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Event/'+id, {headers});
  }
  addComment(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/EventComments', data, {headers})
  }
  deleteCommentById(id:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.delete(environment.baseURL+'/api/EventComments/'+id, {headers})
  }

  updateCommentById(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/EventComments/'+data.eventId, data, {headers})
  }
  getEventsWithCategory(id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Event?categoryId='+id, {headers});
  }

  deleteEvent(id:string):Observable<any> {
    const headers = new HttpHeaders({
     'Authorization': `Bearer ${localStorage.getItem('userToken')}`
   });
   return this._HttpClient.delete(environment.baseURL+'/api/Event/'+id, {headers});
  }
  deleteEventSpeaker(id:string):Observable<any> {
    const headers = new HttpHeaders({
     'Authorization': `Bearer ${localStorage.getItem('userToken')}`
   });
   return this._HttpClient.delete(environment.baseURL+'/api/EventSpeakers/'+id, {headers});
  }
  addEvent(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/Event', data, {headers})
  }
  addEventSpeaker(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/EventSpeakers', data, {headers})
  }
  editEvent(data:any, id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/Event/'+id, data, {headers})
  }
  editEventSpeaker(data:any, id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/EventSpeakers/'+id, data, {headers})
  }


}
