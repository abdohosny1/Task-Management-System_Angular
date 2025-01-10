import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route:Router,private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
           catchError( (error:HttpErrorResponse)=>{
            if(error){
              switch (error.status) {
            case 400:
                  if(error.error.errors){
                    const modelStateErrors=[];
                    for(const key in error.error.errors){

                      if(error.error.errors[key]){
                        modelStateErrors.push(error.error.errors[key])
                      }
                    }
                    throw modelStateErrors.flat();
              }else{
                this.toast.error(error.error,error.status.toString());
              }
              break;
           case 401:
                this.toast.error('Unauthorised',error.status.toString());
                break;
            case 404 :
                 this.route.navigateByUrl('/not-found')
                  break;
            case 500 :
                    const navigation :NavigationExtras ={state:{error:error.error}};
                    this.route.navigateByUrl('/server-error',navigation);
                    break;

            default :
                    this.toast.error("Something unexpected went wrongt ") ;
                    console.log(error);
                    break;

            }
          }
          throw error;
           })
    );
  }
}
