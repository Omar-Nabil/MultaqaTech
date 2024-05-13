import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { SharedModule } from '../shared/shared.module';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogsComponent } from './components/blogs/blogs.component';
// register Swiper custom elements
register();

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class BlogsModule { }
