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
  studentEnrolledCoursesNo:number=0;
  activeCoursesNo:number=0;
  completedCoursesNo:number=0;
  activeCourses:any[] = [];
  completedCourses:any[] = [];
  constructor(private courseService:CourseService, private authService:AuthService) {

  }
  ngOnInit(): void {
    this.getAllEnrolledCourses();
    this.getACtiveCourses();

    this.getCompletedCourses();
  }
  getAllEnrolledCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getAllEnrolledCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.studentEnrolledCourses = res.data;
        this.studentEnrolledCoursesNo =this.studentEnrolledCourses.length
      },
      error:(err) => this.studentEnrolledCoursesNo = 0

    })

  }
  getACtiveCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getActiveCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.activeCourses = res.data;
        this.activeCoursesNo =this.activeCourses.length;
      },
      error:(err) => this.activeCoursesNo = 0

    })

  }
  getCompletedCourses() {
    let studentId = `${this.authService.currentUser.value.studentId}`;
    this.courseService.getCompletedCourses(studentId).subscribe({
      next:(res) => {
        console.log(res);
        this.completedCourses = res.data;
        this.completedCoursesNo=this.completedCourses.length
      },
      error:(err) => this.completedCoursesNo = 0

    })

  }

}
