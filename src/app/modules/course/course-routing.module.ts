import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IllustrationComponent } from './components/children/Illustration/Illustration.component';
import { NotesComponent } from './components/children/notes/notes.component';
import { QuestionDetailsComponent } from './components/children/question-details/question-details.component';
import { QuestionsComponent } from './components/children/questions/questions.component';
import { QuizComponent } from './components/children/quiz/quiz.component';
import { MainComponent } from './components/main/main.component';
import { SummaryComponent } from './components/children/summary/summary.component';

const routes: Routes = [
  {path:'', component:MainComponent, children:[
    {path:'notes', component:NotesComponent},
    {path:'questions', component:QuestionsComponent},
    {path:'quiz', component:QuizComponent},
    {path:'questions/:id', component:QuestionDetailsComponent},
    {path:'Illustration', component:IllustrationComponent},
    {path:'summary', component:SummaryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
