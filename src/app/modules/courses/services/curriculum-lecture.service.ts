import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurriculumLectureService {

  constructor(private _HttpClient: HttpClient) { }

  addLecture(data: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.post(environment.baseURL+'/api/Lectures',data,{headers})
  }
  getLecture(id: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.get(environment.baseURL+`/api/Lectures/${id}`,{headers})
  }
  updateLecture(id:any,data: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.put(environment.baseURL+`/api/Lectures/${id}`,data,{headers})
  }
  deleteLecture(id: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.delete(environment.baseURL+`/api/Lectures/${id}`,{headers})
  }
}
