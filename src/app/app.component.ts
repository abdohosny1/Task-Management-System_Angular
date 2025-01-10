import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { IUser } from './SHARED/model/IUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Task-Management-System';

  constructor(private accountService :AccountService){}


  ngOnInit(): void {
this.loadCurentUser();

  }

  loadCurentUser(){

    const token =localStorage?.getItem("token") || ''  ;
      if(!token) return;

      const user:IUser=JSON.parse(token);
      this.accountService.setCurrentUser(user);

  }
}
