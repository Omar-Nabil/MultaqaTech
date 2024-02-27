import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { RouterLink } from '@angular/router';




@NgModule({
  declarations: [


    NotFound404Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
