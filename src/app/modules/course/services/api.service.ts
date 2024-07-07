import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://anwar101-text2diagram.hf.space/generate-response/';

  constructor(private http: HttpClient) { }

  getExplanation(input: string, model: string = 'llama'): Observable<any> {
    const payload = {
      input: input,
      model: model
    };
    return this.http.post<any>(this.url, payload);
  }
}
