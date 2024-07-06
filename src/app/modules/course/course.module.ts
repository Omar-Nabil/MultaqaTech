import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { IllustrationComponent } from './components/children/Illustration/Illustration.component';
import { NotesComponent } from './components/children/notes/notes.component';
import { QuestionDetailsComponent } from './components/children/question-details/question-details.component';
import { QuestionsComponent } from './components/children/questions/questions.component';
import { QuizComponent } from './components/children/quiz/quiz.component';
import { MainComponent } from './components/main/main.component';
import { CourseRoutingModule } from './course-routing.module';


@NgModule({
  declarations: [
    MainComponent,
    NotesComponent,
    QuizComponent,
    QuestionsComponent,
    QuestionDetailsComponent,
    IllustrationComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
