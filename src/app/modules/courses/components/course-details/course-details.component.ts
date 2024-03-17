import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/modules/dasdboard/services/course.service';
import { start } from 'src/main'
import { Course_get } from '../../interfaces/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {

  course: Course_get | undefined=undefined
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date =new Date()
  constructor(private route:ActivatedRoute,private _CourseService:CourseService) {
    let courseId :number= parseInt(this.route.snapshot.paramMap.get('id')!)
    if (courseId) {
      _CourseService.getcourse(courseId).subscribe({
        next: (res) => {

          this.course = res
          console.log(res);
          this.date =new Date(this.course?.lastUpdatedDate!)


        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }
  ngOnInit(): void {
    start();
  }



}
