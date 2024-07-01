import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { EventsComponent } from './components/event-details/events/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details/event-details.component';
// register Swiper custom elements
register();

@NgModule({
  declarations: [
    EventsComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EventModule { }
