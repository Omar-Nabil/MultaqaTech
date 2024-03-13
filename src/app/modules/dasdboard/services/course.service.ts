import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course_add } from '../../courses/interfaces/course';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _HttpClient: HttpClient) { }

  addcourse(course: Course_add): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/Courses',course,{headers})
  }
}
