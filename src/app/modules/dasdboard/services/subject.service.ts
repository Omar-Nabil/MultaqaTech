import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Subject} from'src/app/modules/dasdboard/interfaces/subject'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _HttpClient: HttpClient) { }


  addsubject(subject:Subject):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Subjects',subject)
  }

  getsubjects():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/Subjects')
  }

  deletesubject(id: number):Observable<any> {
    return this._HttpClient.delete(environment.baseURL+`/api/Subjects/${id}`)
  }
}

