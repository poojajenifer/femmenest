import { CommonModule, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';



@Component({
  selector: 'app-test',
  standalone: true,
  imports:     [ NgFor, NgIf,FormsModule,CommonModule],
  templateUrl: './test.component.html',
   styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  

  @Input('parentData') public name2: any;
  public greeting = "1";
  colors:string[] = ['red','blue','yelloe'];
  loginuser:string = 'Staff?';
  stafforStudent:string = 'Student';
  plan: boolean = true;
  message:string = 'dadada';
  username:string = '';
  password:string = '';
 
  @Output() messageevent:EventEmitter<any> = new EventEmitter<any>();

  
  getAdminPage(username:any,password:any){
    if(username.value == 'KCTAdmin' && password.value == 'Pooja@123'){
        this.router.navigate(['adminportal']);
    }
    else{
      alert('Sorry Incorrect Username and Password for Admin');
    }
  }
  showHome(username:any,password:any){
    console.log('username',username.value+password.value);
    console.log('Loging Into Home',this.stafforStudent);
    if(this.stafforStudent == 'Staff'){
      const login = fetch('http://localhost:8080/staffs?username='+username.value+'&password='+password.value, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res=>{
          return res.json();
          // console.log('The response of the body',a);
        })
        .then(data => {
          // Handle the data returned from the server
          if(data[0]){
            // console.log('The users data',data);
            localStorage.setItem('userId',data[0].id);
            localStorage.setItem('Name',data[0].name);
            this.router.navigate(['dashboard']);

          }
          else{
            alert('Username or Password is incorrect');
          }
          console.log('Post request response:', data[0]);
        })
        .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('There was a problem with the fetch operation:', error);
        });
        console.log('The full response',login);
    }
    else{
      const login = fetch('http://localhost:8080/students?username='+username.value+'&password='+password.value, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res=>{
          return res.json();
          // console.log('The response of the body',a);
        })
        .then(data => {
          // Handle the data returned from the server
          if(data[0]){
            console.log('The users data',data);
            localStorage.setItem('userId',data[0].id);
            localStorage.setItem('FirstName',data[0].firstname);
            localStorage.setItem('LastName',data[0].lastname);
            localStorage.setItem('Class',data[0].classes);
            localStorage.setItem('Department',data[0].department);
            localStorage.setItem('RollNo',data[0].rollNo);
            localStorage.setItem('Address',data[0].address);
            localStorage.setItem('Pincode',data[0].pincode);
            localStorage.setItem('StudentEmail',data[0].studentEmail);
            localStorage.setItem('mobileNumber',data[0].mobileNumber);
            localStorage.setItem('mentorEmail',data[0].mentorEmail);
            localStorage.setItem('staffId',data[0].staffId);
            localStorage.setItem('parentEmail',data[0].parentEmail);


            this.router.navigate(['home']);
            
          }
          else{
            alert('Username or Password is incorrect');
          }
          console.log('Post request response:', data[0]);
        })
        .catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('There was a problem with the fetch operation:', error);
        });
        console.log('The full response',login);
        // if (login.ok) {
        //   alert('Complaint created Successfully');
        //   console.log('Login successful');
        // } else {
        //   throw new Error('Login failed.');
        // }
      // this.router.navigate(['home']);
    }
      this.messageevent.emit(this.message);
  }

  ngOnInit() {
    const container = document.getElementById('container') as HTMLElement;
    
    // Get the register and login button elements by their IDs.
    const registerBtn = document.getElementById('register') as HTMLElement;
    const loginBtn = document.getElementById('login')as HTMLElement;
    
    // Check if registerBtn is not null to avoid null reference exceptions.
    if (registerBtn !== null) {
        registerBtn.addEventListener('click', () => {
            // Ensure container is not null before attempting to manipulate its classList.
            if (container !== null) {
                container.classList.add("active");
            }
        });
    }
    
    // Similar check for loginBtn to ensure it is not null.
    if (loginBtn !== null) {
        loginBtn.addEventListener('click', () => {
            // Again, ensure container is not null before attempting to manipulate its classList.
            if (container !== null) {
                container.classList.remove("active");
            }
        });
    }
    this.onSave('test');
  }

  changeText(){
    console.log('GIiii');
    console.log(this.loginuser);
    if(this.loginuser == 'Staff?'){
        this.loginuser = 'Student?';
        this.stafforStudent = 'Staff';
        console.log('Comes in 1');
    }
    else{
      this.loginuser = 'Staff?';
      this.stafforStudent = 'Student';
      console.log('Comes in 2');
    }
  }

  onSave(event: any){
    this.greeting = "Hello Mahnnnnn"+ event;
    console.log('dddddddddddddddddd',event);
  }

  public name  = 'Alexander';
  public successClass = 'text-success';
  public isDisabled = false;

  constructor(private router: Router) {}

  togglePlan(event:any) {
    this.onSave('love');
    console.log(event);
    this.plan = !this.plan; // Toggle the plan value
  }
}

