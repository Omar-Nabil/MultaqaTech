import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Subject} from'src/app/modules/dasdboard/interfaces/subject'
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _HttpClient: HttpClient) { }


  addsubject(subject:Subject):Observable<any> {
    return this._HttpClient.post('https://localhost:7264/api/Subjects',subject)
  }
}

