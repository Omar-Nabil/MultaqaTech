import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EventCountry} from'src/app/modules/dasdboard/interfaces/event-country'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventscountriesService {

  constructor(private _HttpClient: HttpClient) { }

  addcountry(country:EventCountry):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/EventCountries',country,{headers})
  }
  getcountries():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/EventCountries',{headers})
  }
  getcountry(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/EventCountries/${id}`,{headers})
  }
  deletecountry(id: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/EventCountries/${id}`,{headers})
  }
  updatecountry(id: number,country:EventCountry):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/EventCountries?countryId=${id}`,country,{headers})
  }
}
