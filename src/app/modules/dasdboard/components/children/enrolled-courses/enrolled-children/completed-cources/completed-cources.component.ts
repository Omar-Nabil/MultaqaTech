import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CourseService } from 'src/app/modules/courses/services/course.service';

@Component({
  selector: 'app-completed-cources',
  templateUrl: './completed-cources.component.html',
  styleUrls: ['./completed-cources.component.scss']
})
export class CompletedCourcesComponent {
  completedCourses:any[] = [];
  massage:string="You Have NOT Completed Any Course Yet "
  userCompletedAnyCourse:boolean=true
  constructor(private courseService:CourseService, private authService:AuthService) {
    this.getCompletedCourses();
  }

  getCompletedCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getCompletedCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.completedCourses = res.data;
      },
      error:(err) => this.userCompletedAnyCourse = false

    })

  }
}
