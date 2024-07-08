import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Course_add } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private _HttpClient: HttpClient) { }

  cartItems: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  addcourse(course: any): Observable<any>{
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

  getcourses(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses`,{headers})
  }
  getInstructors(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses/GetInstructors`,{headers})
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
  getcoursesbyRating(MinRating:number,MaxRating:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=12&MinRating=${MinRating}&MaxRating=${MaxRating}`,{headers})
  }
  getcoursesbylanguage(language:string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=12&Language=${language}`,{headers})
  }
  getcoursesFree(maxPrice:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=12&MaxPrice=${maxPrice}`,{headers})
  }
  getcoursesPAID(MinPrice:number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+`/api/Courses?PageSize=12&MinPrice=${MinPrice}`,{headers})
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

  AddCourseToCart(courseId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.post(environment.baseURL+`/api/Baskets/UpdateBasketWithBasketItem?courseId=${courseId}`,{},{headers});
  }

  RemoveItemFromBasket(courseId: Number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.delete(environment.baseURL+`/api/Baskets/RemoveItemFromBasket?courseId=${courseId}`, {headers});
  }

  ClearShoppingCart(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.delete(environment.baseURL+`/api/Baskets`,{headers});
  }

  getBasketItems(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+'/api/Baskets',{headers});
  }

  getAllEnrolledCourses(studentId:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this._HttpClient.get(environment.baseURL+`/api/Courses/GetCoursesForStudentByStudentId/${studentId}`,{headers});
  }

  getRecommendedCoursesId(data: any): Observable<any>  {
  return this._HttpClient.post("https://anwar101-recommendation.hf.space/recommendations",data)
}


}
