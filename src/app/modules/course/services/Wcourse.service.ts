import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { QuizQuestion_get } from '../../courses/interfaces/quiz-question';

@Injectable({
  providedIn: 'root'
})
export class WcourseService {

  constructor(private httpClient:HttpClient) { }

  lectureOrQuizId : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  quizDetails : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  Questions : BehaviorSubject<QuizQuestion_get[]> = new BehaviorSubject<any>(null);

  getCourseDetails(courseId:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/CurriculumSections/${courseId}/sections`, {headers});
  }
  getcourseSectionsDetails(sectionId:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/CurriculumItems/${sectionId}/items`, {headers});
  }

  getcourseLectureDetails(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/Lectures/${id}`, {headers});
  }

  getAllNotes(id:number):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/Notes/${id}/notes`, {headers});
  }

  addNote(data:any):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.post(environment.baseURL+`/api/Notes`, data,{headers});
  }

  deleteNote(id:number):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.delete(environment.baseURL+`/api/Notes/${id}`, {headers});
  }

  updateNote(id:number, data:any):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.put(environment.baseURL+`/api/Notes/${id}`, data , {headers});
  }

  getAllQuestions(id:number):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/Questions/${id}/questions`, {headers});
  }

  addQuestion(data:any):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.post(environment.baseURL+`/api/Questions`, data,{headers});
  }

  deleteQuestion(id:number):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.delete(environment.baseURL+`/api/Questions/${id}`, {headers});
  }

  updateQuestion(id:number, data:any):Observable<any>  {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.put(environment.baseURL+`/api/Questions/${id}`, data , {headers});
  }

  getQuestionDetails(id:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/Questions/${id}`, {headers});
  }

  addAnswer(data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.post(environment.baseURL+`/api/Answers`, data,{headers});
  }

  getAnswers(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.get(environment.baseURL+`/api/Answers/${id}/answers`,{headers});
  }

  updateAnswer(id:number, data:any):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.put(environment.baseURL+`/api/Answers/${id}`, data,{headers});
  }

  deleteAnswer(id:number):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    });
    return this.httpClient.delete(environment.baseURL+`/api/Answers/${id}`,{headers});
  }


}
