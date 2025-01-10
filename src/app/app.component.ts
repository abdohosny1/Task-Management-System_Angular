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

  loadCurentUser() {
    const token = localStorage?.getItem("token") || '';

    if (!token) return;

    // Decode the token and extract user info
    const decodedToken = this.accountService.getDecodedToken(token);

    if (decodedToken) {
      const user: IUser = {
        token,
        name: decodedToken?.name, // or whichever field is relevant
        email: decodedToken?.email
      };

      this.accountService.setCurrentUser(user);
    }
}
}
