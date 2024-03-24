import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomMeetingsComponent } from './components/zoom-meetings/zoom-meetings.component';
import { ZoomMeetingDetailsComponent } from './components/zoom-meeting-details/zoom-meeting-details.component';


@NgModule({
  declarations: [
    ZoomMeetingsComponent,
    ZoomMeetingDetailsComponent
  ],
  imports: [
    CommonModule,
    ZoomRoutingModule
  ]
})
export class ZoomModule { }
