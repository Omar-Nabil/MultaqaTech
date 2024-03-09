import { HttpClient } from '@angular/common/http';
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
    return this._HttpClient.post(environment.baseURL+'/api/BlogPostCategories',category)
  }

  getcategories():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/BlogPostCategories')
  }
  getcategory(id:number):Observable<any> {
    return this._HttpClient.get(environment.baseURL+`/api/BlogPostCategories/${id}`)
  }

  deletecategory(id: number):Observable<any> {
    return this._HttpClient.delete(environment.baseURL+`/api/BlogPostCategories/${id}`)
  }

  updatecategory(id: number,category:Categories):Observable<any> {
    return this._HttpClient.put(environment.baseURL+`/api/BlogPostCategories?categoryId=${id}`,category)
  }
}

