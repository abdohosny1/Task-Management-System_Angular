import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;

  // Toggle register mode
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // Cancel register mode
  cancleRegisterMode(event: any) {
    this.registerMode = false;
  }
}
