import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CurriculumShowService {

  constructor(private _HttpClient: HttpClient) { }
  getItemsforSection(sectionId: any) {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/CurriculumItems/${sectionId}/items`,{headers})

  }
  getSectionByCourseId(id: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
return this._HttpClient.get(environment.baseURL+`/api/CurriculumSections/${id}/sections`,{headers})
  }

}
