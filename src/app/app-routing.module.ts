import { ServerErrorComponent } from './SHARED/COMPONENTS/server-error/server-error.component';
import { NotFoundComponent } from './SHARED/COMPONENTS/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TaskComponent } from './task/task/task.component';
import { DetailsTaskComponent } from './task/details-task/details-task.component';
import { HomeComponent } from './home/home.component';

const routes:Routes=[
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"task",component:TaskComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent} ,
  {path:"DetailsTask/:id",component:DetailsTaskComponent},
  {path:"server-error",component:ServerErrorComponent},

  {path:"not-found",component:NotFoundComponent, },
  {path:"**",redirectTo:"not-found",pathMatch:"full"}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
