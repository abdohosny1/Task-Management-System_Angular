import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //oginForm!:FormGroup;
retutnUrl!:string;

constructor(private accountService:AccountService
  ,private router:Router,
  private fb:FormBuilder
,private activeRout:ActivatedRoute ) { }

ngOnInit(): void {
  this.retutnUrl=this.activeRout.snapshot.queryParams?.['returnUrl'] || '/task';
}

loginForm = this.fb.group({
  email: new FormControl('', [
    Validators.required,
   // Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
  ]),
  password: new FormControl('', Validators.required),
});


get email() {
  return this.loginForm.get('email')!;
}

get password() {
  return this.loginForm.get('password')!;
}
public validate(): void {
  if (this.loginForm.invalid) {
    for (const control of Object.keys(this.loginForm.controls)) {
      // Cast control to keyof typeof this.loginForm.controls
      const formControl = this.loginForm.controls[control as keyof typeof this.loginForm.controls];
      formControl.markAsTouched();
    }
    return;
  } else {

    const { email, password } = this.loginForm.value; // Destructure values
    console.log("Email:", email);
    console.log("Password:", password);
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigateByUrl(this.retutnUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

}
