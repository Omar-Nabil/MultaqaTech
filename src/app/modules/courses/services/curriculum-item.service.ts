import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CurriculumItemService {

  constructor(private _HttpClient: HttpClient) { }

  updateOrderForItems(sectionId: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/CurriculumItems/${sectionId}/items/reorder`,data,{headers})
  }
  getItemsforSection(sectionId: any) {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/CurriculumItems/${sectionId}/items`,{headers})

  }
}
