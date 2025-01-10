import { ServerErrorComponent } from './SHARED/COMPONENTS/server-error/server-error.component';
import { TaskComponent } from './task/task/task.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavBarComponent } from './SHARED/COMPONENTS/nav-bar/nav-bar.component';
import { TextInputComponent } from './SHARED/COMPONENTS/text-input/text-input.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddEditTaskComponent } from './task/add-edit-task/add-edit-task.component';
import { NotFoundComponent } from './SHARED/COMPONENTS/not-found/not-found.component';
import { DetailsTaskComponent } from './task/details-task/details-task.component';
import { JWTInterceptor } from './Interceptor/JWTInterceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoadingInterceptor } from './Interceptor/LoadingInterceptor';
import { ErrorInterceptor } from './Interceptor/ErrorInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    TextInputComponent,
    TaskComponent,
    AddEditTaskComponent,
    NotFoundComponent,
    DetailsTaskComponent,
    HomeComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule.forRoot(), // Use forRoot if you're configuring globally
    ReactiveFormsModule, // Add this
    CommonModule,
    HttpClientModule, // Add this here
    NgbModalModule,
    NgbModule,
    FormsModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JWTInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
   // {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
