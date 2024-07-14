import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://anwar101-text2diagramv2.hf.space/generate-response/';

  constructor(private httpClient: HttpClient) { }

  getExplanation(input: string, model: string = 'llama'): Observable<any> {
    const payload = {
      input: input,
      model: model
    };
    return this.httpClient.post<any>(this.url, payload);
  }

  generateQuiz(data:any):Observable<any> {
    return this.httpClient.post('https://mou3az-mcqa-quiz.hf.space', data);
  }
}
