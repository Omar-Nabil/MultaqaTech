import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-quizgenerator',
  templateUrl: './quizgenerator.component.html',
  styleUrls: ['./quizgenerator.component.css']
})
export class QuizgeneratorComponent implements OnInit {
  temp: any[] = [];
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    let data = {
      context: " Wep Development"
    };
    this.apiService.generateQuiz(data).subscribe({
      next:(res) => {
        console.log(res);
        this.parseResponse(res);

      },
      error:(err) => console.log(err)

    })
  }

  parseResponse(response: string) {

  response.split('\n').forEach((line, index) => {
    this.temp.push(line);
  });
}

}
