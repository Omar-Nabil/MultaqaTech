import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { Course_get } from '../../interfaces/course';
import { Subject } from 'src/app/modules/dasdboard/interfaces/subject';
import { SubjectService } from 'src/app/modules/dasdboard/services/subject.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  pageIndex:number=1
  courses: Course_get[] | undefined
  length: number = 0;
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
  subjects:Subject[]=[]

  constructor(private _CourseService: CourseService , private _SubjectService:SubjectService) {
     _CourseService.getcoursesbysize(99999999).subscribe((res) => {
       this.courses = res
       this.length=this.courses?.length!
     })

     _CourseService.getcoursesbysize(9).subscribe((res) => {
       this.courses = res
     })

    _SubjectService.getsubjects().subscribe((res) => {
      this.subjects=res
    })
  }


  ngOnInit(): void {
    main.start();

  }

  incrementIndex() {
    this.pageIndex += 1
    $('#circle1').html(`${this.pageIndex}`)
    $('#circle2').html(`${this.pageIndex + 1}`)
    this._CourseService.getcoursesbyIndex(9,this.pageIndex).subscribe((res) => {
       this.courses = res
    })
  }
  decrementIndex() {
    this.pageIndex -= 1
    $('#circle1').html(`${this.pageIndex}`)
    $('#circle2').html(`${this.pageIndex + 1}`)
    this._CourseService.getcoursesbyIndex(9,this.pageIndex).subscribe((res) => {
       this.courses = res
    })
  }

  getbysubject(subject: number) {
    this._CourseService.getcoursesbysubject(subject).subscribe((res) => {
      this.courses = res
      this.length=this.courses?.length!
    })

  }
  getbylevel(level: number) {

    console.log('clicked '+ level);

    this._CourseService.getcoursesbylevel(level).subscribe((res) => {
      this.courses = res
      console.log(this.courses);
      this.length=this.courses?.length!

    })

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
