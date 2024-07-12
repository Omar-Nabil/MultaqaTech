import { Component, OnInit } from '@angular/core';
import { QuizQuestion_get } from 'src/app/modules/courses/interfaces/quiz-question';
import { CurriculumQuizQuestionService } from 'src/app/modules/courses/services/curriculum-quiz-question.service';
import { CurriculumQuizService } from 'src/app/modules/courses/services/curriculum-quiz.service';
import { WcourseService } from '../../../services/Wcourse.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizDetails: any;
  questions: QuizQuestion_get[] = [];
  startQuizBool: boolean = false;
  questionIndex: number = 0
  selectedAnswers: boolean=false;
  isSubmit: boolean = false;
  explaination: any;
  chooseAnswerBool: boolean = false;
  score: number = 0
  showScoreBool: boolean = false
  passed:boolean=false

  constructor(private course:WcourseService ,private quiz :CurriculumQuizService,private _questions:CurriculumQuizQuestionService) { }

  ngOnInit() {

    this.course.quizDetails.subscribe(() => {
      if (this.course.lectureOrQuizId.value!=null) {
        localStorage.setItem('quizId',`${this.course.lectureOrQuizId.value}`)
      }
      this.getQuizDetails()
      this.getQuizQuestions()
      this.startQuizBool = false;
  this.questionIndex = 0
  this.isSubmit = false;
  this.chooseAnswerBool = false;
  this.score = 0
  this.showScoreBool = false
      this.passed = false

      if (this.quizDetails == null) {


       this.quiz.getQuiz(+(localStorage.getItem('quizId')??0)).subscribe({
      next: (res) => {
        this.quizDetails = res
        this.course.quizDetails.next(res)

      }
    })

    this._questions.getQuestionsByQuizId(+(localStorage.getItem('quizId')??0)).subscribe({
      next: (res) => {
        this.course.Questions.next(res)
        this.questions=res
      },
      error: (err) => {
        console.log(err);
      }
    })
    }
    })

  }

  getQuizDetails() {
    this.quizDetails=this.course.quizDetails.value
  }

  getQuizQuestions() {
    this.questions = this.course.Questions.value
    console.log(this.questions);

  }

  startQuiz() {
    this.startQuizBool=true
  }

  onAnswerChange(i: any,j:any) {
    this.selectedAnswers = this.questions[i].quizQuestionChoices[j].isRight
    this.explaination = this.questions[i].quizQuestionChoices[j].clarification
    this.chooseAnswerBool = true
    console.log(this.selectedAnswers);
    console.log(this.explaination);

  }
  getNextQuestion() {
    this.questionIndex++;
    this.isSubmit = false;
    this.selectedAnswers = false
    this.explaination = ''
    this.chooseAnswerBool=false
  }
  submitAnswer() {
    this.isSubmit = true
    if (this.selectedAnswers == true) {
      this.score++
    }

  }
  showScore() {
    this.showScoreBool = true;
    this.questionIndex++;
    if (this.score >= ((this.questions.length) / 2)) {
      this.passed = true
      console.log(+this.course.lectureOrQuizId.value);

      this.quiz.Quizcomplete(+this.course.lectureOrQuizId.value).subscribe({
        next: (res) => {
          console.log(res);

        },
        error:(res) => {
          console.log(res);

        }
      })
    }
  }
}
