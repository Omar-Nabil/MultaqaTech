import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurriculumSectionService {

  constructor(private _HttpClient: HttpClient) { }

  addSection(data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.post(environment.baseURL+'/api/CurriculumSections',data,{headers})
  }
  reorderSections(id:any,data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.put(environment.baseURL+`/api/CurriculumSections/${id}/sections/reorder`,data,{headers})
  }
  getSectionByCourseId(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.get(environment.baseURL+`/api/CurriculumSections/${id}/sections`,{headers})
  }
  getSectionById(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.get(environment.baseURL+`/api/CurriculumSections/${id}`,{headers})
  }
  updateSection(id:any,data: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.put(environment.baseURL+`/api/CurriculumSections/${id}`,data,{headers})
  }
  deleteSection(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.delete(environment.baseURL+`/api/CurriculumSections/${id}`,{headers})
  }
}
