import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizQuestion_get } from 'src/app/modules/courses/interfaces/quiz-question';
import { CurriculumQuizQuestionService } from 'src/app/modules/courses/services/curriculum-quiz-question.service';
import { CurriculumQuizService } from 'src/app/modules/courses/services/curriculum-quiz.service';
import { TranslateService } from 'src/app/modules/pages/services/translate.service';
import { TranscriptionService } from '../../services/transcription.service';
import { WcourseService } from '../../services/Wcourse.service';

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
  extractedText: string = '';
  transcriptionLoadingBool: boolean = true;
  constructor(private wcourseService: WcourseService, private route: ActivatedRoute,private el: ElementRef,
    private renderer: Renderer2, private quiz: CurriculumQuizService,private _TranslateService:TranslateService,
    private _questions: CurriculumQuizQuestionService,private _TranscriptionService:TranscriptionService) { }

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
          console.log(res);

        },
        error:(err) => console.log(err)

      })
    }
    console.log(this.courseSectionsDetails);

  }

  displayVideo(lectureId: number) {
    this.wcourseService.getcourseLectureDetails(lectureId).subscribe({
      next:(res) => {
        this.transcriptionLoadingBool = true
        this._TranscriptionService.summaryBool.next(false)
        this._TranscriptionService.translationBool.next(false)
        this.videoData = res;
        this.wcourseService.lectureOrQuizId.next(res.id);
        this.isVideo = true;
        this.videoId = this.wcourseService.lectureOrQuizId.value;
        this.videoFile = this.videoData.videoUrl
        console.log(this.videoFile);
        this._TranscriptionService.fetchFile(this.videoData.videoUrl).subscribe({
          next: (res) => {
            this.videoFile = new File([res], 'filename.ext', { type: res.type });
            console.log(this.videoFile);
            const formData = new FormData();
            formData.append('video', this.videoFile);

    this._TranscriptionService.getTransacreption(formData).subscribe({
      next:(res) => {
        console.log(res.error.text);

      },
      error:(err) => { console.log(err.error.text);
        const parser = new DOMParser();
    const doc = parser.parseFromString(err.error.text, 'text/html');
    const paragraphs = doc.getElementsByTagName('p');

    if (paragraphs.length > 0) {
      this.extractedText = paragraphs[0].textContent || '';
      this._TranscriptionService.transcriptionTxt.next(this.extractedText);
      this._TranscriptionService.getsummary({ text: this.extractedText }).subscribe({
        next: (res) => {
          this._TranscriptionService.summaryTxt.next(res.summary)
          this._TranscriptionService.summaryBool.next(true)
          this._TranslateService.getArabicTrans({text:res.summary}).subscribe({
            next: (res) => {
              this._TranscriptionService.translationTxt.next(res.translated_text)
          this._TranscriptionService.translationBool.next(true)
              console.log(res);

            }
          })
          console.log(res);

        }
      })
    } else {
      this.extractedText = 'No paragraph found.';
      this._TranscriptionService.summaryTxt.next('There is no summary')
      this._TranscriptionService.summaryBool.next(true)
      this._TranscriptionService.translationBool.next(true)


    }
        console.log(this.extractedText);

        this.transcriptionLoadingBool = false;

      }

    })

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
    console.log('displayQuiz');

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
