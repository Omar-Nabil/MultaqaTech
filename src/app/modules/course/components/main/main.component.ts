import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizQuestion_get } from 'src/app/modules/courses/interfaces/quiz-question';
import { CurriculumQuizQuestionService } from 'src/app/modules/courses/services/curriculum-quiz-question.service';
import { CurriculumQuizService } from 'src/app/modules/courses/services/curriculum-quiz.service';
import { WcourseService } from '../../services/Wcourse.service';
import { error } from 'console';
import { from } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  id: string = '';
  courseSections:any[] = [];
  courseSectionsDetails:any[] = [];
  isCourseItemVisible: boolean[] = [];
  videoData:any;
  quizDetails: any;
  questions: QuizQuestion_get[] = [];
  isVideo:boolean = false;
  videoId:number = 0;
  videoFile!: File ;
  constructor(private wcourseService: WcourseService, private route: ActivatedRoute,private el: ElementRef,
    private renderer: Renderer2, private quiz: CurriculumQuizService ,private _questions:CurriculumQuizQuestionService) { }

  ngOnInit() {
    this.getCourseDetails();
    const segments = this.route.snapshot.children[0].routeConfig?.path;
    if(segments != 'quiz') {
      this.displayVideo(1);
    }

  }

  ngAfterViewInit() {
     this.isCourseItemVisible = Array(this.courseSections?.length).fill(false);
  }


  toggleCourseItems(index: number) {
    // Toggle visibility of the course items for the clicked section
    this.isCourseItemVisible[index] =!this.isCourseItemVisible[index];

    // Find the arrow icon and toggle its class
    const arrowIcon = this.el.nativeElement.querySelectorAll('.arrow')[index];
    if (arrowIcon) {
      if (arrowIcon.classList.contains('fa-arrow-down')) {
        arrowIcon.classList.remove('fa-arrow-down');
        arrowIcon.classList.add('fa-arrow-up');
      } else {
        arrowIcon.classList.remove('fa-arrow-up');
        arrowIcon.classList.add('fa-arrow-down');
      }
    }
  }

  getCourseDetails() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.wcourseService.getCourseDetails(`${this.id}`).subscribe({
      next:(res) => {
        this.courseSections = res;
        this.getcourseSectionsDetails();
        console.log(res);

      },
      error:(err) => console.log(err)

    })
  }

  getcourseSectionsDetails() {
    for (let index = 0; index < this.courseSections?.length; index++) {
      this.wcourseService.getcourseSectionsDetails(`${this.courseSections[index].id}`).subscribe({
        next:(res) => {
          this.courseSectionsDetails[index] = res;

        },
        error:(err) => console.log(err)

      })
    }
    console.log(this.courseSectionsDetails);

  }

  displayVideo(lectureId:number) {
    this.wcourseService.getcourseLectureDetails(lectureId).subscribe({
      next:(res) => {
        this.videoData = res;
        this.wcourseService.lectureOrQuizId.next(res.id);
        this.isVideo = true;
        this.videoId = this.wcourseService.lectureOrQuizId.value;
        console.log('get file is done');
        this.videoFile = this.videoData.videoUrl
        console.log(this.videoFile);
        this.wcourseService.fetchFile(this.videoData.videoUrl).subscribe({
          next: (res) => {
            console.log('get file is done 2');
            console.log(res);
             this.videoFile = new File([res], 'filename.ext', { type: res.type });
      console.log(this.videoFile);

          },
          error:(err) => {
            console.log('from error');
            console.log(err);

          }
        })

      },
      error:(err) => console.log(err)

    })
  }

  displayQuiz(quizId:number) {
    this.isVideo = false;
    this.videoId = this.wcourseService.lectureOrQuizId.value;
    this.wcourseService.lectureOrQuizId.next(quizId)
    this.quiz.getQuiz(quizId).subscribe({
      next: (res) => {
        this.quizDetails = res
        this.wcourseService.quizDetails.next(res)

      }
    })

    this._questions.getQuestionsByQuizId(this.wcourseService.lectureOrQuizId.value).subscribe({
      next: (res) => {
        this.wcourseService.Questions.next(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
