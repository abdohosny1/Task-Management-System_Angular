import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, switchMap, timer, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors!: string[];

  // Define the form group with proper typing
  registerForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    name: FormControl<string | null>;
  }>;

  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")], [this.validateEmailNotTaken()]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.registerForm.get('email')!;
  }

  get name() {
    return this.registerForm.get("name")!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  public Register(): void {
    if (this.registerForm.invalid) {
      for (const controlName of Object.keys(this.registerForm.controls)) {
        const control = this.registerForm.controls[controlName as keyof typeof this.registerForm.controls];
        control.markAsTouched();
      }
      return;
    } else {
      console.log(this.registerForm.value);
      this.accountService.register(this.registerForm.value).subscribe(
        () => {
          this.router.navigateByUrl("/task");
        },
        (error) => {
          this.errors = error.errors;
          console.log(error);
        }
      );
    }
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExit(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
