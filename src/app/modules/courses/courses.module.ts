import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import{DragDropModule}from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [
    HomeComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CurriculumComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class CoursesModule { }
