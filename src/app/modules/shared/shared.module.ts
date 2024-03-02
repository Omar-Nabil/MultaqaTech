import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';




@NgModule({
  declarations: [


    NotFound404Component,
        NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink
  ],
  exports:[
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent
  ]
})
export class SharedModule { }
