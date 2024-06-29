import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  isVideo:boolean = false;
  videoId:number = 0;

  constructor(private wcourseService:WcourseService, private route: ActivatedRoute, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.getCourseDetails();
    this.displayVideo(1);
  }

  ngAfterViewInit() {
     this.isCourseItemVisible = Array(this.courseSections.length).fill(false);
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
    for (let index = 0; index < this.courseSections.length; index++) {
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
      },
      error:(err) => console.log(err)

    })
  }

  displayQuiz(quizId:number) {
    this.isVideo = false;
    this.videoId = this.wcourseService.lectureOrQuizId.value;
  }


}
