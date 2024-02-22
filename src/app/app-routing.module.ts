import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/auth/components/welcome/welcome.component';
import { HomeComponent } from './modules/courses/components/home/home.component';


const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'home', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
