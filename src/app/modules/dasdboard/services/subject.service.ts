import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Subject} from'src/app/modules/dasdboard/interfaces/subject'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  constructor(private _HttpClient: HttpClient) { }


  addsubject(subject: Subject): Observable<any> {
     const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/Subjects',subject,{headers})
  }

  getsubjects(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/Subjects',{headers})
  }
  getsubject(id: number): Observable<any> {
     const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Subjects/${id}`,{headers})
  }

  deletesubject(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/Subjects/${id}`,{headers})
  }

  updatesubject(id: number, subject: Subject): Observable<any> {
     const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/Subjects?subjectId=${id}`,subject,{headers})
  }
}

