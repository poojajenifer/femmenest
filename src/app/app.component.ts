import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { FormsModule } from '@angular/forms';
// import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgIf } from '@angular/common';
import { AppRoutes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TestComponent,FormsModule,HomeComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) {}

  message:string | undefined;

  receiveMessage(event:any): void {
    this.router.navigate(['home']);

    // this.message = $event
    // this.showreg = false;
    // this.showCom = true;
    
    console.log('Message received');

  }

  public name = 'Name  d';
  title = 'hello-world';
  showCom:boolean = false;
  showreg:boolean = true;
}
