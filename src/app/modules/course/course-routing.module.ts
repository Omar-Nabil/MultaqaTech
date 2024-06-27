import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './components/children/notes/notes.component';
import { QuestionsComponent } from './components/children/questions/questions.component';
import { QuizComponent } from './components/children/quiz/quiz.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path:'', component:MainComponent, children:[
    {path:'notes', component:NotesComponent},
    {path:'questions', component:QuestionsComponent},
    {path:'quiz', component:QuizComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
