import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { DasdboardModule } from './modules/dasdboard/dasdboard.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutwithnavbarComponent } from './layout/layoutwithnavbar/layoutwithnavbar.component';


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
    DasdboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
