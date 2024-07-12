import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CourseService } from 'src/app/modules/courses/services/course.service';

@Component({
  selector: 'app-all-cources',
  templateUrl: './all-cources.component.html',
  styleUrls: ['./all-cources.component.scss']
})
export class AllCourcesComponent {
  studentEnrolledCourses:any[] = [];
  constructor(private courseService:CourseService, private authService:AuthService) {
    this.getAllEnrolledCourses();
  }

  getAllEnrolledCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getAllEnrolledCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.studentEnrolledCourses = res.data;
      },
      error:(err) => console.log(err)

    })

  }

}
