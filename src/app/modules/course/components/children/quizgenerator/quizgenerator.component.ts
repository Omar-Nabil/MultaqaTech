import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'app-quizgenerator',
  templateUrl: './quizgenerator.component.html',
  styleUrls: ['./quizgenerator.component.scss']
})
export class QuizgeneratorComponent implements OnInit {
  temp: any[] = [];
  cannotload:boolean = false;
  constructor(private apiService:ApiService, private transcriptionService:TranscriptionService) { }

  ngOnInit() {
    this.transcriptionService.translationBool.subscribe((res) => {
      if(res == true) {
        let data = {
          context: this.transcriptionService.transcriptionTxt.getValue()
        };
        this.apiService.generateQuiz(data).subscribe({
          next:(res) => {
            console.log(res);
            this.parseResponse(res);

          },
          error:(err) => {
            console.log(err);
            this.cannotload = true;
          }

        })
      }
      console.log(res);

    })
  }

  parseResponse(response: string) {

  response.split('\n').forEach((line, index) => {
    this.temp.push(line);
  });
}

}
