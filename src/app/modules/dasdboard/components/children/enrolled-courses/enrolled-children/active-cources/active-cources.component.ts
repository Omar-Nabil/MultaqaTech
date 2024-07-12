import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CourseService } from 'src/app/modules/courses/services/course.service';

@Component({
  selector: 'app-active-cources',
  templateUrl: './active-cources.component.html',
  styleUrls: ['./active-cources.component.scss']
})
export class ActiveCourcesComponent {
  activeCourses:any[] = [];
  massage:string="You Have NOT Been Active At Any Course Yet "
  userCompletedAnyCourse:boolean=true
  constructor(private courseService:CourseService, private authService:AuthService) {
    this.getACtiveCourses();
  }

  getACtiveCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getActiveCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.activeCourses = res.data;
      },
      error:(err) => this.userCompletedAnyCourse = false

    })

  }
}
