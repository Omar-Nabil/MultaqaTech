import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainComponent } from './components/main/main.component';
import { CourseRoutingModule } from './course-routing.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
