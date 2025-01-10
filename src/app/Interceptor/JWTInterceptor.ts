import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { Injectable } from "@angular/core";
import { AccountService } from "../account/account.service";

@Injectable()

export class JWTInterceptor implements HttpInterceptor{

  constructor(private accountServices:AccountService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.accountServices.currentUser$.pipe(take(1)).subscribe({
          next :user =>{
            if(user){
              req=req.clone({
                setHeaders:{
                  Authorization:`Bearer ${user.token}`
                }
              })
            }
          }
        })

    return next.handle(req);
  }

}
