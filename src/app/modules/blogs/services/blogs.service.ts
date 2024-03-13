import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private _HttpClient:HttpClient) { }

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
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts?Search='+text+"&PageIndex="+pageNumber, {headers});
  }

  getCategories():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/BlogPostCategories');
  }
  getSubjects():Observable<any> {
    return this._HttpClient.get(environment.baseURL+'/api/Subjects');
  }

  filterByCategoryId(catId:number, pageNumber: number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts?categoryId='+catId+"&PageIndex="+pageNumber, {headers});
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

  deleteCommentById(id:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.delete(environment.baseURL+'/api/BlogPostComments/'+id, {headers})
  }

  updateCommentById(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/BlogPostComments/'+data.blogPostId, data, {headers})
  }

  getBlogsWithCategory(id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts?categoryId='+id, {headers});
  }

  shareBlog(id:string):Observable<any> {
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/BlogPosts/'+id+'/sharelink', {headers});
  }

  deleteBlog(id:string):Observable<any> {
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.delete(environment.baseURL+'/api/BlogPosts/'+id, {headers});
  }

  postBlog(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+'/api/BlogPosts', data, {headers})
  }

  editBlog(data:any, id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.put(environment.baseURL+'/api/BlogPosts/'+id, data, {headers})
  }
}
