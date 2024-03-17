import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgFor
  ]
})
export class CoursesModule { }
