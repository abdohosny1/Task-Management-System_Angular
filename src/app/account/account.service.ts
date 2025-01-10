import { Router } from '@angular/router';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../SHARED/model/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource=new ReplaySubject<IUser>(1);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient,private router:Router) { }



  // getCurentUserValue(){
  //   return this.currentUserSource.value;
  // }

  loadCurrentUser(token:string){
    if(token === null){
      this.currentUserSource.next(null!);
      return ;
    }
    let hedder=new HttpHeaders();
    hedder=hedder.set('Authorization',`Bearer ${token}`);

    return this.http.get(environment.BASE_URL+"Acount",{headers:hedder}).pipe(
      map((user:any)=>{
      if(user){
        localStorage.setItem("token",user.token);
        this.currentUserSource.next(user);
      }
      })
    )
  }

  login(value:any){
    console.log("inside service");
    console.log(value.email);
    return this.http.post(environment.BASE_URL+environment.ACOUNTLOGIN,value).pipe(
      map((user:any)=>{
        if(user){
          localStorage.setItem("token",user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(value:any){
    return this.http.post(environment.BASE_URL+environment.ACOUNTREGISTER,value).pipe(
      map((user:any)=>{
        if(user){
          localStorage.setItem("token",user.token);
         // this.currentUserSource.next(user);
         this.currentUserSource.next(user);

        }
      })
    );
  }

  logout(){
    localStorage.removeItem("token");
    this.currentUserSource.next(null!);
    this.router.navigateByUrl("/");

  }

  checkEmailExit(email:string){
    return this.http.get(environment.BASE_URL+environment.ACOUNTEMAILEXISTS+"?email="+email)

  }

  setCurrentUser(user:IUser){
    //user.roles=[];
    const roles= this.getDecodedToken(user.token).role;
   // Array.isArray(roles) ? user.roles = roles :user.roles.push(roles);
    localStorage.setItem("user",JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  getDecodedToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }


}
