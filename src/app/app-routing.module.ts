import { NotFoundComponent } from './SHARED/COMPONENTS/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TaskComponent } from './task/task/task.component';
import { DetailsTaskComponent } from './task/details-task/details-task.component';

const routes:Routes=[
  {path:"",component:TaskComponent},
  {path:"task",component:TaskComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent} ,
  {path:"DetailsTask/:id",component:DetailsTaskComponent},

  {path:"not-found",component:NotFoundComponent, },
  {path:"**",redirectTo:"not-found",pathMatch:"full"}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
