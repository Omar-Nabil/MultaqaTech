import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  gettrans(text:any):Observable<any> {
    return this.http.post('https://elalimy-test.hf.space/translate', text);
  }

}
