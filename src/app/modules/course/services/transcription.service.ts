import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {

  constructor(private http:HttpClient) { }

  transcriptionTxt : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  summaryTxt : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  summaryBool : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  translationTxt : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  translationBool : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    fetchFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  getTransacreption(formData:any):Observable<any> {
    return this.http.post('https://elalimy-video-text.hf.space/upload', formData);
  }
  getsummary(Data:any):Observable<any> {
    return this.http.post('https://anwar101-summarization-api-3.hf.space/summarize', Data);
  }
}
