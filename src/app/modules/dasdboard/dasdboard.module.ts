import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasdboardRoutingModule } from './dasdboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/children/dashboard/dashboard.component';
import { MyProfileComponent } from './components/children/my-profile/my-profile.component';
import { EnrolledCoursesComponent } from './components/children/enrolled-courses/enrolled-courses.component';
import { WishListComponent } from './components/children/wish-list/wish-list.component';
import { ReviewsComponent } from './components/children/reviews/reviews.component';
import { MyquizeAttmComponent } from './components/children/myquize-attm/myquize-attm.component';
import { PurchaseHistoryComponent } from './components/children/purchase-history/purchase-history.component';
import { IMycoursesComponent } from './components/children/i-mycourses/i-mycourses.component';
import { IAnnouncementsComponent } from './components/children/i-announcements/i-announcements.component';
import { IWithdrawalsComponent } from './components/children/i-withdrawals/i-withdrawals.component';
import { IQuizAttmptsComponent } from './components/children/i-quiz-attmpts/i-quiz-attmpts.component';
import { IQandAComponent } from './components/children/i-qand-a/i-qand-a.component';
import { IAssignmentsComponent } from './components/children/i-assignments/i-assignments.component';
import { IMystudentsComponent } from './components/children/i-mystudents/i-mystudents.component';
import { SettingsComponent } from './components/children/settings/settings.component';
import { SettingProfileComponent } from './components/children/setting-profile/setting-profile.component';
import { SettingsResetpasswordComponent } from './components/children/settings-resetpassword/settings-resetpassword.component';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    MyProfileComponent,
    EnrolledCoursesComponent,
    WishListComponent,
    ReviewsComponent,
    MyquizeAttmComponent,
    PurchaseHistoryComponent,
    IMycoursesComponent,
    IAnnouncementsComponent,
    IWithdrawalsComponent,
    IQuizAttmptsComponent,
    IQandAComponent,
    IAssignmentsComponent,
    IMystudentsComponent,
    SettingsComponent,
    SettingProfileComponent,
    SettingsResetpasswordComponent,

  ],
  imports: [
    CommonModule,
    DasdboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DasdboardModule { }
