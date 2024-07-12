import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from '../shared/components/not-found404/not-found404.component';
import { DashboardComponent } from './components/children/dashboard/dashboard.component';
import { EnrolledCoursesComponent } from './components/children/enrolled-courses/enrolled-courses.component';
import { IAnnouncementsComponent } from './components/children/i-announcements/i-announcements.component';
import { IAssignmentsComponent } from './components/children/i-assignments/i-assignments.component';
import { IMycoursesComponent } from './components/children/i-mycourses/i-mycourses.component';
import { IMystudentsComponent } from './components/children/i-mystudents/i-mystudents.component';
import { IQandAComponent } from './components/children/i-qand-a/i-qand-a.component';
import { IQuizAttmptsComponent } from './components/children/i-quiz-attmpts/i-quiz-attmpts.component';
import { IWithdrawalsComponent } from './components/children/i-withdrawals/i-withdrawals.component';
import { MyProfileComponent } from './components/children/my-profile/my-profile.component';
import { MyquizeAttmComponent } from './components/children/myquize-attm/myquize-attm.component';
import { PurchaseHistoryComponent } from './components/children/purchase-history/purchase-history.component';
import { ReviewsComponent } from './components/children/reviews/reviews.component';
import { SettingProfileComponent } from './components/children/setting-profile/setting-profile.component';
import { SettingsResetpasswordComponent } from './components/children/settings-resetpassword/settings-resetpassword.component';
import { SettingsComponent } from './components/children/settings/settings.component';
import { WishListComponent } from './components/children/wish-list/wish-list.component';
import { MainComponent } from './components/main/main.component';
import { SubjectsComponent } from './components/children/admin/subjects/subjects.component';
import { CategoriesComponent } from './components/children/admin/categories/categories.component';
import { MeetingscategoriesComponent } from './components/children/admin/meetingscategories/meetingscategories.component';
import { EventscategoriesComponent } from './components/children/admin/eventscategories/eventscategories/eventscategories.component';
import { EventscountriesComponent } from './components/children/admin/eventscountries/eventscountries/eventscountries.component';
import { path } from 'd3';
import { AllCourcesComponent } from './components/children/enrolled-courses/enrolled-children/all-cources/all-cources.component';
import { ActiveCourcesComponent } from './components/children/enrolled-courses/enrolled-children/active-cources/active-cources.component';
import { CompletedCourcesComponent } from './components/children/enrolled-courses/enrolled-children/completed-cources/completed-cources.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'myprofile',component:MyProfileComponent},
    {path:'enrolledcourses',component:EnrolledCoursesComponent ,children:[
      {path:'',redirectTo:'allcources',pathMatch:'full'},
      {path:'allcources',component:AllCourcesComponent},
      {path:'activecources',component:ActiveCourcesComponent},
      {path:'completedcources',component:CompletedCourcesComponent}]},
    {path:'wishlist',component:WishListComponent},
    {path:'reviews',component:ReviewsComponent},
    {path:'myquizattmp',component:MyquizeAttmComponent},
    {path:'purchasehistory',component:PurchaseHistoryComponent},
    {path:'mycourses',component:IMycoursesComponent},
    {path:'announcements',component:IAnnouncementsComponent},
    {path:'withdrawals',component:IWithdrawalsComponent},
    {path:'quizattmpts',component:IQuizAttmptsComponent},
    {path:'q&a',component:IQandAComponent},
    {path:'assignments',component:IAssignmentsComponent},
    {path:'mystudents',component:IMystudentsComponent},
    {path:'subjects',component:SubjectsComponent},
    {path:'Meetingscategories',component:MeetingscategoriesComponent},
    {path:'Eventscategories',component:EventscategoriesComponent},
    {path:'Eventscountries',component:EventscountriesComponent},
    {path:'categories',component:CategoriesComponent},
      {
        path: 'settings', component: SettingsComponent, children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          {path:'profile',component:SettingProfileComponent},
          {path:'reset',component:SettingsResetpasswordComponent}
    ]},
  ]},
  {path:'**',component:NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasdboardRoutingModule { }
