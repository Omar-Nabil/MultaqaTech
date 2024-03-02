import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutwithnavbarComponent } from './layout/layoutwithnavbar/layoutwithnavbar.component';
import { ForgotPasswordComponent } from './modules/auth/components/forgot-password/forgot-password.component';
import { WelcomeComponent } from './modules/auth/components/welcome/welcome.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { HomeComponent } from './modules/courses/components/home/home.component';
import { NotFound404Component } from './modules/shared/components/not-found404/not-found404.component';

const routes: Routes = [
  {path:'', component:LayoutComponent, children:[
    {path:'', redirectTo:'welcome', pathMatch:'full'},
    {path:'welcome', component:WelcomeComponent},

    {path:'api/Account/ResetPassword', component:ForgotPasswordComponent},
    {path:'dashboard', loadChildren:()=>import('../app/modules/dasdboard/dasdboard.module').then((res)=>res.DasdboardModule), canActivate:[authGuard] },
  ]},
  {path:'', component:LayoutwithnavbarComponent, children:[
    {path:'home', component:HomeComponent, canActivate:[authGuard]},
  ]},
  {path:"**", component:NotFound404Component}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
