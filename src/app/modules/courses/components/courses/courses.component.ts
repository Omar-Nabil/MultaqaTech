import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { Subject } from 'src/app/modules/dasdboard/interfaces/subject';
import { SubjectService } from 'src/app/modules/dasdboard/services/subject.service';
import * as main from '../../../../../main';
import { Course_get, instructor } from '../../interfaces/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  pageIndex:number=1
  courses: Course_get[] | undefined
  allCourses: Course_get[] | undefined
  length: number = 0;
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
  prices: string[] = ['Free', 'Paid'];
  subjects:Subject[]=[]
  instructors:instructor[]=[]
  languages: string[] = [];
  ratings: number[] = [100, 80, 60, 40, 20];

  constructor(private _CourseService: CourseService , private _SubjectService:SubjectService) {
     _CourseService.getcoursesbysize(99999999).subscribe((res) => {
       this.courses = res.data
       this.length = this.courses?.length!
       console.log(this.courses);

     })

     _CourseService.getcoursesbysize(9).subscribe((res) => {
       this.courses = res.data
     })


    _SubjectService.getsubjects().subscribe((res) => {
      this.subjects = res
      console.log(res);
      console.log(this.subjects);

    })
    _CourseService.getInstructors().subscribe((res) => {
      this.instructors = res
      console.log(res);
      console.log(this.instructors);

    })
  }


  ngOnInit(): void {
    main.start();
    $('body,html').scrollTop(-10)
    console.log(this.courses);
    this._CourseService.getcoursesbysize(9).subscribe((res) => {
      this.courses = res.data
    })
    this._CourseService.getcourses().subscribe((res) => {
      this.allCourses = res.data
      console.log(this.allCourses);
      if (this.allCourses) {
        this.languages = [...new Set(this.allCourses.map(course => course.language))];
      }
    })
    console.log(this.languages)


  }

  incrementIndex() {
    this.pageIndex += 1
    $('#circle1').html(`${this.pageIndex}`)
    $('#circle2').html(`${this.pageIndex + 1}`)
    this._CourseService.getcoursesbyIndex(9,this.pageIndex).subscribe({
      next: (res) => {
      this.courses = res.data
      $('body,html').scrollTop(50)
    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    })
  }
  decrementIndex() {
    this.pageIndex -= 1
    $('#circle1').html(`${this.pageIndex}`)
    $('#circle2').html(`${this.pageIndex + 1}`)
    this._CourseService.getcoursesbyIndex(9, this.pageIndex).subscribe(
    {
      next: (res) => {
      this.courses = res.data
      $('body,html').scrollTop(50)
    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    }
      )
  }

  getbysubject(subject: number) {
    this._CourseService.getcoursesbysubject(subject).subscribe({
      next: (res) => {
        this.courses = res.data
        this.length = this.courses?.length!
      },error:(err) =>{
        this.courses=[]
 ;
this.length=0;
$('body,html').scrollTop(50)     },
    }
    )

  }
  getbyinstructor(instructorId: number) {
    this._CourseService.getCoursesbyInstructorId(instructorId).subscribe(
      {
      next: (res) => {
      this.courses = res.data
      this.length=this.courses?.length!
      $('body,html').scrollTop(250)
    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    }
      )

  }
  getbylevel(level: number) {

    console.log('clicked '+ level);

    this._CourseService.getcoursesbylevel(level).subscribe(

          {
      next: (res) => {
      this.courses = res.data
      console.log(this.courses);
      this.length = this.courses?.length!
      $('body,html').scrollTop(250)

    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    }
      )

  }
  getbyRating(MinRating: number,MaxRating:number) {


    this._CourseService.getcoursesbyRating(MinRating, MaxRating).subscribe(
      {
      next: (res) => {
      this.courses = res.data
      console.log(this.courses);
      this.length = this.courses?.length!
      $('body,html').scrollTop(250)

    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    }
      )

  }
  getbylangauge(language: string) {



    this._CourseService.getcoursesbylanguage(language).subscribe(

      {
      next: (res) => {
      this.courses = res.data
      console.log(this.courses);
      this.length = this.courses?.length!
      $('body,html').scrollTop(250)

    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    })

  }
  getbyPrice(refrence: number) {
    if (refrence==0){
      this._CourseService.getcoursesFree(0).subscribe({
      next: (res) => {
      this.courses = res.data
      console.log(this.courses);
      this.length = this.courses?.length!
      $('body,html').scrollTop(250)

    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    })
    }else{
      this._CourseService.getcoursesPAID(1).subscribe({
      next: (res) => {
      this.courses = res.data
      console.log(this.courses);
      this.length = this.courses?.length!
      $('body,html').scrollTop(250)

    },error:(err) =>{
        this.courses=[];
        this.length=0;
        $('body,html').scrollTop(50)
      },
    })
    }


  }
  getStarsArray(rate:number): number[] {
    const fullStars = Math.floor(rate); // Number of full stars
    const hasHalfStar = rate - fullStars >= 0.5; // Check if there's a half star

    let starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(1); // Full star
    }

    if (hasHalfStar) {
      starsArray.push(0.5); // Half star
    }

    // Adjust to total of 5 stars
    while (starsArray.length < 5) {
      starsArray.push(0); // Empty star
    }

    return starsArray;
  }

  //  hide() {
  //    if ($('#btncollapse').hasClass('collapsed')) {
  //    } else {
  //     //  $('#collapseFilter').css('display','none')
  //      $('#collapseFilter').removeClass('show')
  //      $('#btncollapse').addClass('collapsed')
  //    }
  // }

}
