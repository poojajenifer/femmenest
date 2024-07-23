import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { combineAll } from 'rxjs';

@Component({
  selector: 'app-studentprofile',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './studentprofile.component.html',
  styleUrl: './studentprofile.component.css'
})
export class StudentprofileComponent implements OnInit{
  studentName:any;
  outpassTable = true;
  showOutpassDialog = false;
  maintainenceTable = false;
  feedbackTable = false;
  complaintsTable = false;
  studentComplaints:any = [];
  studentMaintainance:any = [];
  studentOutpasses:any = [];
  studendsFeedbacks:any = [];
  studentClass = localStorage.getItem('Class');
  rollNo = localStorage.getItem('RollNo');
  department = localStorage.getItem('Department');
  address  = localStorage.getItem('Address');
  pincode = localStorage.getItem('Pincode');
  studentEmail = localStorage.getItem('StudentEmail');
  userId = localStorage.getItem('userId');
  mobileNumber = localStorage.getItem('mobileNumber');
  singleOutpass:any = {};


  

  viewoupass(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.studentOutpasses.forEach((element:any) => {
          if(element.id == id){
            this.singleOutpass = element;
          }
      });
      console.log(this.singleOutpass);
      this.showOutpassDialog = true;
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }
  

  singleStudentMaintain:any = {};
  viewStudentMaintain(id:any){ 

    var a = document.getElementById('parent-dialogue') as HTMLElement;
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      // console.log('Am I getting the Id ',id);
      console.log('The user maintain',id);
      this.studentMaintainance.forEach((element:any) => {
        if(element.id == id){
          this.singleStudentMaintain = element; 
        }
        console.log('element',element);
      });
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }

  singleFeedback:any = {};
  viewStudentFeedback(id:any){ 
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      // console.log('Am I getting the Id ',id);
      console.log('The user maintain',id);
      this.studendsFeedbacks.forEach((element:any) => {
        if(element.id == id){
          this.singleFeedback = element; 
        }
        console.log('element',element);
      });
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }

  singleComplaint:any = {};
  viewStudentComplaint(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      // console.log('Am I getting the Id ',id);
      console.log('The user maintain',id);
      this.studentComplaints.forEach((element:any) => {
        if(element.id == id){
          this.singleComplaint = element; 
        }
        console.log('element',element);
      });
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }

openPopup(){
  let popup = document.getElementById('popup') as HTMLElement;
  popup.classList.add('open-popup');

}

closePopup(){
  let popup = document.getElementById('popup') as HTMLElement;
  popup.classList.remove('open-popup');
  var a = document.getElementById('parent-dialogue') as HTMLElement;
    
  a.style.display = 'flex';
  a.style.visibility = 'hidden';
  this.showOutpassDialog = false;
}
  
  
  ngOnInit(): void {
    // getComplaintsById({})
    this.getOutpasses();
    this.getFeedbacks();
    this.getMaintainance();
    this.getComplaints();
      var firstName = localStorage.getItem('FirstName');
      var lastName = localStorage.getItem('LastName');
      this.studentName = firstName;
      if(lastName!=null){
        this.studentName += ' '+lastName;
      } 
  }

  getOutpasses(){

    const complaints = fetch('http://localhost:8080/getOutpasses',{
      method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((response)=>{
      return response.json();
    })
    .then((res)=>{
      var complaints = res;
      console.log('The outpasses',complaints);
      complaints.forEach((element:any) => {
          if(element.userId == this.userId){
            // element.startdate = element.date.split('T')[0];
            this.studentOutpasses.push(element);
          }
          this.singleOutpass =  this.studentOutpasses[0];
      });
      console.log('The responses ',res);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });

  }

  getFeedbacks(){
    const feedbacks = fetch('http://localhost:8080/getFeedbacks',{
      method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((response)=>{
      return response.json();
    })
    .then((res)=>{
      var complaints = res;
      console.log('The response from the server feed',complaints);
      complaints.forEach((element:any) => {
          if(element.userId == this.userId){
            if(element.createdDate != '' && element.createdDate != null){
              console.log('element.createdDate',element.createdDate);  
              element.createdDate = element.createdDate.split('T')[0]
              }
            this.studendsFeedbacks.push(element);
          }
      });
      console.log('The responses ',res);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error.message);
    }); 
  }

  getMaintainance(){

    const complaints = fetch('http://localhost:8080/getMaintainance',{
      method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((response)=>{
      return response.json();
    })
    .then((res)=>{
      var complaints = res;
      console.log('The response from the server',complaints);
      complaints.forEach((element:any) => {
          if(element.userId == this.userId){
            // element.startdate = element.date.split('T')[0];
            this.studentMaintainance.push(element);
          }
      });
      console.log('The responses ',res);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error.message);
    });

  }

  getComplaints(){
    const complaints = fetch('http://localhost:8080/getComplaints',{
      method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((response)=>{
      return response.json();
    })
    .then((res)=>{
      var complaints = res;
      complaints.forEach((element:any) => {
          if(element.userId == this.userId){
            element.date = element.date.split('T')[0];
            this.studentComplaints.push(element);
          }
      });
      console.log('The responses ',res);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  showOutpassTable(event:any){
    var a  = document.querySelectorAll('.nav-link');
    a.forEach((e:any)=>{
      e.classList.remove('active');
    });
    console.log('e',event);
    event.srcElement.parentElement.classList.add('active');
    this.outpassTable = true;
    this.maintainenceTable = false;
    this.feedbackTable = false;
    this.complaintsTable = false;
  }
  showmaintainenceTable(event:any){
    var a  = document.querySelectorAll('.nav-link');
    a.forEach((e:any)=>{
      e.classList.remove('active');
    });
    event.srcElement.parentElement.classList.add('active');
    this.outpassTable = false;
    this.maintainenceTable = true;
    this.feedbackTable = false;
    this.complaintsTable = false;
  }
  showFeedbackTable(event:any){
    var a  = document.querySelectorAll('.nav-link');
    a.forEach((e:any)=>{
      e.classList.remove('active');
    });
    event.srcElement.parentElement.classList.add('active');
    this.outpassTable = false;
    this.maintainenceTable = false;
    this.feedbackTable = true;
    this.complaintsTable = false;
  }
  showComplaintsTable(event:any){
    var a  = document.querySelectorAll('.nav-link');
    a.forEach((e:any)=>{
      e.classList.remove('active');
    });
    event.srcElement.parentElement.classList.add('active');
    this.outpassTable = false;
    this.maintainenceTable = false;
    this.feedbackTable = false;
    this.complaintsTable = true;

  }

}
