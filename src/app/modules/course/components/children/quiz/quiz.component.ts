import { Component, Input, OnInit } from '@angular/core';
import { WcourseService } from '../../../services/Wcourse.service';
import { CurriculumQuizService } from 'src/app/modules/courses/services/curriculum-quiz.service';
import { CurriculumQuizQuestionService } from 'src/app/modules/courses/services/curriculum-quiz-question.service';
import { QuizQuestion_get, QuizQuestion_post } from 'src/app/modules/courses/interfaces/quiz-question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizDetails: any;
  questions:QuizQuestion_get[]=[]

  constructor(private course:WcourseService ,private quiz :CurriculumQuizService,private _questions:CurriculumQuizQuestionService) { }

  ngOnInit() {

    this.course.quizDetails.subscribe(() => {
      this.getQuizDetails()
    this.getQuizQuestions()
    })
  }

  getQuizDetails() {
    this.quizDetails=this.course.quizDetails.value
  }

  getQuizQuestions() {
    this.questions = this.course.Questions.value
    console.log(this.questions);

  }

}
