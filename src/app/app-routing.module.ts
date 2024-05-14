import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutwithnavbarComponent } from './layout/layoutwithnavbar/layoutwithnavbar.component';
import { ConfirmEmailComponent } from './modules/auth/components/ConfirmEmail/ConfirmEmail.component';
import { ForgotPasswordComponent } from './modules/auth/components/forgot-password/forgot-password.component';
import { WelcomeComponent } from './modules/auth/components/welcome/welcome.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { loginGuard } from './modules/auth/guards/login.guard';
import { BlogDetailsComponent } from './modules/blogs/components/blog-details/blog-details.component';
import { BlogsComponent } from './modules/blogs/components/blogs/blogs.component';
import { CourseDetailsComponent } from './modules/courses/components/course-details/course-details.component';
import { CoursesComponent } from './modules/courses/components/courses/courses.component';
import { HomeComponent } from './modules/courses/components/home/home.component';
import { NotFound404Component } from './modules/shared/components/not-found404/not-found404.component';
import { ZoomMeetingDetailsComponent } from './modules/zoom/components/zoom-meeting-details/zoom-meeting-details.component';
import { ZoomMeetingsComponent } from './modules/zoom/components/zoom-meetings/zoom-meetings.component';
import { CurriculumComponent } from './modules/courses/components/curriculum/curriculum.component';
const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', redirectTo:'welcome', pathMatch:'full'},
    {path:'welcome', component:WelcomeComponent,canActivate:[loginGuard]},

    {path:'api/Account/ResetPassword', component:ForgotPasswordComponent},
    {path:'api/Account/ConfirmEmail', component: ConfirmEmailComponent},
    {path:'dashboard', loadChildren:()=>import('../app/modules/dasdboard/dasdboard.module').then((res)=>res.DasdboardModule), canActivate:[authGuard] },
  ]},
  {path:'', component:LayoutwithnavbarComponent, children:[
    {path:'home', component:HomeComponent, canActivate:[authGuard]},
    {path:'blogs', component:BlogsComponent, canActivate:[authGuard]},
    {path:'blogs/:id', component:BlogDetailsComponent, canActivate:[authGuard]},
    {path:'courses', component:CoursesComponent, canActivate:[authGuard]},
    {path:'course/:id', component:CourseDetailsComponent, canActivate:[authGuard]},
    {path:'curriculum/:id', component:CurriculumComponent, canActivate:[authGuard]},
    {path:'zooms', component:ZoomMeetingsComponent, canActivate:[authGuard]},
    {path:'zooms/:id', component:ZoomMeetingDetailsComponent, canActivate:[authGuard]},
    {path:'cart', loadChildren:() => import('../app/modules/cart/cart.module').then((res)=>res.CartModule), canActivate:[authGuard] }
  ]},
  {path:"**", component:NotFound404Component}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
