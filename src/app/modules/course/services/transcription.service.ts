import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {

  constructor(private http:HttpClient) { }

    fetchFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

  getTransacreption(formData:any):Observable<any> {
    return this.http.post('https://elalimy-video-text.hf.space/upload', formData);
  }
}
