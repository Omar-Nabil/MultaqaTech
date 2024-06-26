import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Categories} from'src/app/modules/dasdboard/interfaces/categories'
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private _HttpClient: HttpClient) { }


  addcategory(category:Categories):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(environment.baseURL+'/api/BlogPostCategories',category,{headers})
  }

  getcategories():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/BlogPostCategories',{headers})
  }
  getcategory(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/BlogPostCategories/${id}`,{headers})
  }

  deletecategory(id: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(environment.baseURL+`/api/BlogPostCategories/${id}`,{headers})
  }

  updatecategory(id: number,category:Categories):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/BlogPostCategories?categoryId=${id}`,category,{headers})
  }
}

