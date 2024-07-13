import { Component, OnInit } from '@angular/core';
import * as main from '../../../../../main';
import { Course_get } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _CourseService:CourseService,private _Router: Router){}

  ngOnInit(): void {
    main.start();
    this._CourseService.getcoursesbysize(10).subscribe({
      next: (res) => {
        this.courses=res.data
      }
    })
  }

  courses: Course_get[] | undefined
  levels: string[] = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];

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
}
