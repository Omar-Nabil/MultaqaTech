import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ZoomRoutingModule } from './zoom-routing.module';
import { ZoomMeetingsComponent } from './components/zoom-meetings/zoom-meetings.component';
import { ZoomMeetingDetailsComponent } from './components/zoom-meeting-details/zoom-meeting-details.component';
import { register } from 'swiper/element/bundle';


@NgModule({
  declarations: [
    ZoomMeetingsComponent,
    ZoomMeetingDetailsComponent
  ],
  imports: [
    CommonModule,
    ZoomRoutingModule,
    ReactiveFormsModule
  ]
})
export class ZoomModule { }
