import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurriculumQuizService {


   constructor(private _HttpClient: HttpClient) { }

  addQuiz(data: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.post(environment.baseURL+'/api/Quizes',data,{headers})
  }
  getQuiz(id: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.get(environment.baseURL+`/api/Quizes/${id}`,{headers})
  }
  updateQuiz(id:any,data: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.put(environment.baseURL+`/api/Quizes/${id}`,data,{headers})
  }
  Quizcomplete(id:any,data: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.put(environment.baseURL+`/api/Quizes/${id}`,data,{headers})
  }
  deleteQuiz(id: any): Observable<any> {
    const  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  })
    return this._HttpClient.delete(environment.baseURL+`/api/Quizes/${id}`,{headers})
  }
}
