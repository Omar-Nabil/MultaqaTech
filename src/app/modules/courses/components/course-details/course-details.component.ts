import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/modules/courses/services/course.service';
import { start } from 'src/main'
import { Course_get } from '../../interfaces/course';
import { FormControl, FormGroup } from '@angular/forms';
import { Reviews_add } from '../../interfaces/reviews';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {

  course: Course_get | undefined=undefined
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date = new Date()
  courseId:number=0
  AddcommentForm:FormGroup = new FormGroup({
    rating:new FormControl(0),
    Comment:new FormControl(''),
  })
  constructor(private route:ActivatedRoute,private _CourseService:CourseService,private reviews:ReviewsService) {
    this.getCourse()
  }
  ngOnInit(): void {
    start();
  }

  getCourse() {
   this.courseId= parseInt(this.route.snapshot.paramMap.get('id')!)
    if (this.courseId) {
      this._CourseService.getcourse(this.courseId).subscribe({
        next: (res) => {

          this.course = res
          this.date =new Date(this.course?.lastUpdatedDate!)


        },
        error: (err) => {
          console.log(err);

        }
      })
    }
}

  addcomment() {
    const Comment: Reviews_add = {
      courseId: this.course?.id!,
      content: this.AddcommentForm.get('Comment')?.value,
      numberOfStars:this.AddcommentForm.get('rating')?.value
    }
    this.reviews.addcomment(Comment).subscribe({
      next: (res) => {
        console.log(res);
        this.reset();
        this.getCourse()
      },
      error:(res)=>{console.log(res);
      }
    })
  }
  reset() {
  this.AddcommentForm.get('Comment')?.setValue('')
  this.AddcommentForm.get('rating')?.setValue('')
  }

  isgreater(n1: number, n2: number) {
    return n1>n2
  }
  isgreaterequal(n1: number, n2: number) {
    return n1>=n2
  }
  issmaller(n1: number, n2: number) {
    return n1<n2
  }
  issmallerequal(n1: number, n2: number) {
    return n1<=n2
  }

  slidedown() {
    $('#collapseForm').slideToggle(600)
  }

  Delete(id: number, review: Reviews_add) {
    console.log({
      courseid: this.courseId,
      id:id
    });

    this.reviews.deletecomment(id,review).subscribe((res) => {
      console.log(res);
      this.getCourse()

})
}

}
