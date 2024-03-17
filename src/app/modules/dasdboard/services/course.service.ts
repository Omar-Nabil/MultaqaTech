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

  getcoursesbysize(size:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=${size}`,{headers})
  }
  getcoursesbyIndex(size:number,index:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=${size}&PageIndex=${index}`,{headers})
  }
  getcoursesbysubject(subject:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?SubjectId=${subject}`,{headers})
  }
  getcoursesbylevel(CourseLevel:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=12&CourseLevel=${CourseLevel}`,{headers})
  }
  getcourse(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses/${id}`,{headers})
  }
}
