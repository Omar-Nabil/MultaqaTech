import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CourseService } from 'src/app/modules/courses/services/course.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  studentEnrolledCourses:any[] = [];
  constructor(private courseService:CourseService, private authService:AuthService) {

  }
  ngOnInit(): void {
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
