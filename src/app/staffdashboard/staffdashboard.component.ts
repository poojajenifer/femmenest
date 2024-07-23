import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-staffdashboard',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './staffdashboard.component.html',
  styleUrl: './staffdashboard.component.css'
})
export class StaffdashboardComponent implements OnInit {
  listOfRequests:any = [];
  listOfOutpass:any = [];
  listOfFeedback:any = [];
  listOfMatainence:any = [];
  listofComplaints:any = [];
  singleOutpass:any = {};
  singleRequest:any = {};
  singleComplaint:any = {};
  singleMaintainence:any = {};
  singleFeedBack:any = {};



  // listOfComplaints = 0;
  // lengthOfOutpass = 0;
  // lengthOfFeedback = 0;
  // lengthOfMaintanence = 0;

  
  showDashboard= true;
  showOutpassList=false;
  showMaintanence = false;
  showFeedback = false;
  showComplaint = false;
  async ngOnInit() {

    await this.getComplaints();
    await this.getOutPass();
    await this.getFeedback();
    await this.getMaintenance();
        // console.log('The full response',login);    
  }
  viewRecentReq(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.listOfRequests.forEach((element:any) => {
          if(element.id == id){
            this.singleRequest = element;
          }
      });
      console.log(this.singleRequest);
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }
 
  viewOutpass(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.listOfOutpass.forEach((element:any) => {
          if(element.id == id){
            this.singleOutpass = element;
            this.selectedOutpassValue = this.singleOutpass.status; 
          }
      });
      console.log(this.singleOutpass);
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }

  ViewComplaint(id:any){

    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.listofComplaints.forEach((element:any) => {
          if(element.id == id){
            this.singleComplaint = element;
          }
      });
      console.log(this.singleComplaint);
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');

  }


  viewFeedback(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.listOfFeedback.forEach((element:any) => {
          if(element.id == id){
            this.singleFeedBack = element;
          }
      });
      console.log(this.singleOutpass);
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }
  viewMaintainence(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
      console.log('Am I getting the Id ',id);
      // var singleOutpass;
      this.listOfMatainence.forEach((element:any) => {
          if(element.id == id){
            this.singleMaintainence = element;
          }
      });
      console.log(this.singleOutpass);
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup'); 
  }

  async getMaintenance(){
    const login = await fetch('http://localhost:8080/getMaintainance', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      return res.json();
    })
    .then(data => {
      // this.listOfComplaints = data.length;
      fetch('http://localhost:8080/getStudents',{
        method:'GET',
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
        },
      })
      .then(response=>{
        return response.json();
      })
      .then(students=>{
        var studentIds:any = [];
            students.forEach((element:any) => {
                if(element.staffId == localStorage.getItem('userId')){
                  studentIds.push(element.id);
                }
            });
        console.log('students ',studentIds);
        data.forEach((element: any)=> {
          this.singleMaintainence = data[0];
          console.log('data',element);
          if(element.createdDate!=null){
            element.createdDate = element.createdDate.split('T')[0];
            if(element.userId!=null){
              students.forEach((e:any)=>{
                if(parseInt(element.userId) == e.id){
                    element.name = e.firstname +' '+e.lastname;
                }
              })
            }
            console.log('studentIds.includes(element.userId)',studentIds.includes(parseInt(element.userId)));
            if(element.userId!=null){
            if(studentIds.includes(parseInt(element.userId))){
              this.listOfMatainence.push(element);
              element.type = 'Maintainance';
              this.listOfRequests.push(element);
            }
            console.log('this.listOfMatainence',this.listOfMatainence);
          }
          }
        });
      })
      console.log('The maintanaence from the data',data);
    })
  }

  async getFeedback(){
    const login = await fetch('http://localhost:8080/getFeedbacks', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      return res.json();
    })
    .then(data => {
      // this.listOfComplaints = data.length;
      fetch('http://localhost:8080/getStudents',{
        method:'GET',
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
        },
      })
      .then(response=>{
        return response.json();
      })
      .then(students=>{
        var studentIds:any = [];
            students.forEach((element:any) => {
                if(element.staffId == localStorage.getItem('userId')){
                  studentIds.push(element.id);
                }
            });
        console.log('students ',studentIds);
        data.forEach((element: any)=> {
          this.singleFeedBack = data[0]; 
          console.log('data',element);
          if(element.createdDate!=null){
            element.createdDate = element.createdDate.split('T')[0];
            if(element.userId!=null){
              students.forEach((e:any)=>{
                if(parseInt(element.userId) == e.id){
                    element.name = e.firstname +' '+e.lastname;
                }
              })
            }
            console.log('studentIds.includes(element.userId)',studentIds.includes(element.userId));
            if(element.userId!=null){
            if(studentIds.includes(parseInt(element.userId))){
              this.listOfFeedback.push(element);
            }
            console.log('this.listOfFeedback',this.listOfFeedback);
          }
          }
        });
      })
      console.log('The maintanaence from the data',data);
    })
  }


  async getOutPass(){
    this.listOfOutpass = [];
    const login = await fetch('http://localhost:8080/getOutpasses', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      return res.json();
    })
    .then(data => {
      // this.listOfComplaints = data.length;
      fetch('http://localhost:8080/getStudents',{
        method:'GET',
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
        },
      })
      .then(response=>{
        return response.json();
      })
      .then(students=>{
        var studentIds:any = [];
            students.forEach((element:any) => {
              console.log('element.staffId',JSON.stringify(element)+'  ' + localStorage.getItem('userId'));
                if(element.staffId == localStorage.getItem('userId')){
                  studentIds.push(element.id);
                }
            });
        console.log('students ',studentIds);
        this.singleOutpass = data[0];
        this.listOfRequests = [];
        data.forEach((element: any)=> { 
          console.log('data',element);
          if(element.fromdate!=null){
            element.fromdate = element.fromdate.split('T')[0];
            element.todate = element.todate.split('T')[0];
            if(element.userId!=null){
              students.forEach((e:any)=>{
                if(parseInt(element.userId) == e.id){
                    element.name = e.firstname +' '+e.lastname;
                }
              })
            }
            console.log(' Outpass studentIds.includes(element.userId)',studentIds.includes(parseInt(element.userId)));
            if(element.userId!=null){
            if(studentIds.includes(parseInt(element.userId))){
              this.listOfOutpass.push(element);
            }
            console.log('this.listOfRequests',this.listOfRequests);
          }
          }
        });
      })
      console.log('The maintanaence from the data',data);
    })
  }


  async getComplaints(){
    const login = await fetch('http://localhost:8080/getComplaints', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      return res.json();
    })
    .then(data => {
      // this.listOfComplaints = data.length;
      fetch('http://localhost:8080/getStudents',{
        method:'GET',
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
        },
      })
      .then(response=>{
        return response.json();
      })
      .then(students=>{
        var studentIds:any = [];
            students.forEach((element:any) => {
                if(element.staffId == localStorage.getItem('userId')){
                  studentIds.push(element.id);
                }
            });
        console.log('students ',studentIds);
        data.forEach((element: any)=> {
          this.singleComplaint = data[0]; 
          // console.log('data',element);
          // if(element.createdDate!=null){
            element.createdDate = element.createdDate.split('T')[0];
            if(element.userId!=null){
              students.forEach((e:any)=>{
                if(parseInt(element.userId) == e.id){
                    element.name = e.firstname +' '+e.lastname;
                }
              })
            }
            console.log('studentIds.includes(element.userId)',studentIds.includes(element.userId));
            if(element.userId!=null){
            if(studentIds.includes(parseInt(element.userId))){
              this.listofComplaints.push(element);
            }
            console.log('this.listofComplaints',this.listofComplaints);
          }
          // }
        });
      })
      console.log('The maintanaence from the data',data);
    })
  }


  ShowOutpass(event:any){
    this.showDashboard = false;
    this.showOutpassList=true;
    this.showMaintanence = false;
    this.showFeedback = false;
    this.showComplaint = false;
    var a = document.querySelectorAll('.sideMenu');
    a.forEach((e)=>{
      if(e.className.includes('active')){
        e.classList.remove('active');
      }
    })
    console.log('a',a);
    console.log('event',event.srcElement.classList.add("active"));
  }
  showMaintainenceRequests(event:any){
    this.showOutpassList=false;
    this.showDashboard = false;
    this.showMaintanence = true;
    this.showFeedback = false;
    this.showComplaint = false;
    var a = document.querySelectorAll('.sideMenu');
    a.forEach((e)=>{
      if(e.className.includes('active')){
        e.classList.remove('active');
      }
    })
    console.log('a',a);
    console.log('event',event.srcElement.classList.add("active"));

  }
  showFeedbackRequests(event:any){
    this.showOutpassList=false;
    this.showDashboard = false;
    this.showMaintanence = false;
    this.showFeedback = true;
    this.showComplaint = false;
    var a = document.querySelectorAll('.sideMenu');
    a.forEach((e)=>{
      if(e.className.includes('active')){
        e.classList.remove('active');
      }
    })
    console.log('a',a);
    console.log('event',event.srcElement.classList.add("active"));
  }

  onSelected(value:string){
    this.selectedOutpassValue = value;
  }
  async closeOutpassPopup(id:any){
      console.log('closeOutpassPopup',id);
      const login = await fetch('http://localhost:8080/updateOutpasses?id='+id+'&status='+this.selectedOutpassValue, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (login.ok) {
          // alert('Complaint created Successfully');
          await this.getOutPass();
          console.log('Login successful');
        } else {
          throw new Error('Login failed.');
        }
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.remove('open-popup');
      var a = document.getElementById('parent-dialogue') as HTMLElement;
        
      a.style.display = 'flex';
      a.style.visibility = 'hidden';
  }
  selectedOutpassValue:any;
  closePopup(){
    let status = document.getElementById('statuses') as HTMLElement;
    // console.log('status',status.options[status.selectedIndex].text);
    let popup = document.getElementById('popup') as HTMLElement;
    popup.classList.remove('open-popup');
    var a = document.getElementById('parent-dialogue') as HTMLElement;
      
    a.style.display = 'flex';
    a.style.visibility = 'hidden';
    // this.showOutpassDialog = false;
  }

  showComplaintRequests(event:any){
    this.showOutpassList=false;
    this.showDashboard = false;
    this.showMaintanence = false;
    this.showFeedback = false;
    this.showComplaint = true;
    var a = document.querySelectorAll('.sideMenu');
    a.forEach((e)=>{
      if(e.className.includes('active')){
        e.classList.remove('active');
      }
    })
    console.log('a',a);
    console.log('event',event.srcElement.classList.add("active"));
  }

}
