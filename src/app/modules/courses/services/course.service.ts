import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course_add } from '../interfaces/course';
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
  updateCourse(id:any,course: Course_add): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/Courses/${id}`,course,{headers})
  }
  getCourseById(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses/${id}`,{headers})
  }
  deleteCourseById(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/Courses/${id}`,{headers})
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
  getCoursesbyInstructorId(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses/GetCoursesForInstructorByInstructorId/${id}`,{headers})
  }
  getcourse(id:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses/${id}`,{headers})
  }
}
