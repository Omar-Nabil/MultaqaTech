import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutwithnavbarComponent } from './layout/layoutwithnavbar/layoutwithnavbar.component';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CoursesModule } from './modules/courses/courses.module';
import { SharedModule } from './modules/shared/shared.module';
import { ZoomModule } from './modules/zoom/zoom.module';
import{DragDropModule}from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutwithnavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    BlogsModule,
    CoursesModule,
    ZoomModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
