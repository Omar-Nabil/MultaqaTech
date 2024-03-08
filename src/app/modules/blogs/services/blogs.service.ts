import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }

  getCurrentPage(pageNumber: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+"/api/BlogPosts?PageIndex="+pageNumber, {headers});
  }

  blogsSearch(text:string, pageNumber: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts?search='+text+"&pageindex="+pageNumber, {headers});
  }

  getCategories():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/BlogPostCategories');
  }
  getSubjects():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/Subjects');
  }

  filterByCategoryId(catId:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts?categoryId='+catId, {headers});
  }

  getBlogDetailes(id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts/'+id, {headers});
  }

  addComment(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/BlogPostComments', data, {headers})
  }
}
