import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { WelcomeComponent } from './modules/auth/components/welcome/welcome.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { HomeComponent } from './modules/courses/components/home/home.component';

const routes: Routes = [
  {path:'welcome', component:WelcomeComponent},
  {path:'home', component:HomeComponent, canActivate:[authGuard]},
  {path:'', redirectTo:'welcome', pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
