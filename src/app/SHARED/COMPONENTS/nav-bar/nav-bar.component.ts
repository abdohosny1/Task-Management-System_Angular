import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../model/IUser';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
   // curentUser$ ?:any;
 curentUser$: Observable<IUser | null>;
 user:any;
 isLogedIn=false;
 constructor(private accountService:AccountService,private router:Router) {
   this.curentUser$=this.accountService.currentUser$;
  }


 ngOnInit(): void {
  this.getCurrentUser();
 }

 logout(){
   this.accountService.logout();
   this.router.navigateByUrl('/'); // Redirect to home page on success
 }

 getCurrentUser(){
   this.accountService.currentUser$.subscribe({
     next:user => {
       this.isLogedIn= !! user;
       this.user=user;

     },
     error:error=>console.log(error)
   })
 }
}
