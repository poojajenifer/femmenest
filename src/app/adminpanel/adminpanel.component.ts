import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [CommonModule,NgIf,NgFor],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css'
})
export class AdminpanelComponent implements OnInit {
  constructor(private router: Router) {}


  singleStudent:any = {};
  singleStaff:any = {};
  showDashboard = true;
  showStudents = false;
  showStaffs = false;
  showHostelNews = false;
  showStudentCreation = false;
  showStaffCreation = false;
  dialogueTitle = 'Create Student';
  listOfStaffs:any;
  toastMessage = 'Student';

  closePopup(){
    // closePopup(){
      let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.remove('open-popup');
      var a = document.getElementById('parent-dialogue') as HTMLElement;
        
      a.style.display = 'flex';
      a.style.visibility = 'hidden';
      // this.showOutpassDialog = false;
    // }
  }

  showToast(){
    var x = document.getElementById("snackbar")as HTMLElement;
    console.log('The X value is ',x);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  viewStudent(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
    this.listOfStudents.forEach((element:any) => {
        if(element.id == id){
          this.singleStudent = element; 
        }
    });
    let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }

  viewStaff(id:any){
    var a = document.getElementById('parent-dialogue') as HTMLElement;
    
    a.style.display = 'flex';
    a.style.visibility = 'visible';
    a.style.background = 'rgba(0, 0, 0, 0.4)';
    this.listOfStaffs.forEach((element:any) => {
        if(element.id == id){
          if(element.dateOfBirth!=null) element.dateOfBirth = element.dateOfBirth.split('T')[0]
          this.singleStaff = element; 
        }
    });
    let popup = document.getElementById('popup') as HTMLElement;
      popup.classList.add('open-popup');
  }



  closeStudentCreationDialog(){
    this.showStudentCreation = false;
  }
  closeStaffCreationDialog(){
    this.showStaffCreation= false;
  }

  openStudentCreation(){
    this.showStudentCreation = true;
  }
  openStaffCreation(){
    this.dialogueTitle = 'Create Staff';
    this.showStaffCreation = true;
  }

  handleDashboard(){
    this.showDashboard = true;
    this.showStudents = false;
    this.showStaffs = false;
    this.showHostelNews = false;
  }
  handleStudents(){
    this.showDashboard = false;
    this.showStudents = true;
    this.showStaffs = false;
    this.showHostelNews = false;
  }
  handleStaffs(){
    this.showDashboard = false;
    this.showStudents = false;
    this.showStaffs = true;
    this.showHostelNews = false;
  }
  handleHostelNews(){
    this.showDashboard = false;
    this.showStudents = false;
    this.showStaffs = false;
    this.showHostelNews = true;
  }

  listOfRecentsStaff:any=[]
  listOfRecentsStudent:any=[]


  getStaffs(){

    const login = fetch('http://localhost:8080/getStaffs', {
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
            // data.forEach((element: any) => {
            //   console.log('element',element);
              this.listOfStaffs= data;
              this.listOfRecentsStaff = []
              for(let i=0;i<6;i++){
                this.listOfRecentsStaff.push(data[i]);
              }
              console.log('this.listOfStaffs',this.listOfStaffs);
            // });
            // this.router.navigate(['home']);
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
  }


  ngOnInit(): void {
    this.getStudents()
    this.getStaffs();
     var a = document.querySelector('.container') as HTMLElement;
     a.style.margin = '0';
     a.style.paddingLeft = '0';
     a.style.justifyContent = 'center';
     a.style.top = '4rem';
     a.style.display = 'block';
     a.style.position = 'static';
    console.log('listOfStaffs',this.listOfStaffs);

  }
  loginpage(){
    var a = document.querySelector('.container') as HTMLElement;
     a.style.margin = '';
     a.style.paddingLeft = '';
     a.style.justifyContent = 'center';
     a.style.top = '4rem';
     a.style.display = 'flex';
     a.style.position = 'relative';
    this.router.navigate(['']);
  }

  //Creating Staff Account
  async createStaff(name:any,dob:any,pincode:any,permanentAddress:any,phoneNumber:any,bloodGroup:any,mailId:any){
    const login = await fetch('http://localhost:8080/addStaffs', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            name:name.value,
            username:phoneNumber.value+'@kct.com',
            password:name.value.slice(0,3)+pincode.value.slice(0,3),
            dateOfBirth:dob.value,
            pincode:pincode.value,
            permanentAddress:permanentAddress.value,
            phoneNumber:phoneNumber.value,
            bloodGroup:bloodGroup.value,
            mailId:mailId.value
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (login.ok) {
          name.value = '';
          dob.value = '';
          pincode.value = '';
          permanentAddress.value = '';
          phoneNumber.value ='';
          bloodGroup.value = '';
          mailId.value = '';
          this.toastMessage = 'Staff Created ';
          this.getStudents();
          this.showToast();
          // alert('Staff created Successfully');
          console.log('Login successful');
        } else {
          throw new Error('Login failed.');
        } 
  }

  deleteStaffonfirm(id:any) {
    let text = "Are you sure want to delete the Staff?";
    if (confirm(text) == true) {
      this.deleteStaff(id);
      // text = "You pressed OK!";
    }
  }
  deleteStudentConfirm(id:any){
    let text = "Are you sure want to delete the Student?";
    if (confirm(text) == true) {
      this.deleteStudent(id);
    }
  }

  deleteStaff(id:any){
    const login = fetch('http://localhost:8080/deleteStaff?id='+id, {
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
      if(data){
        console.log('data',data);
        this.getStaffs();
        this.toastMessage = 'Staff Deleted ';
        this.showToast();
    }
      // Handle the data returned from the server
      console.log('Post request response:', data[0]);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }



  deleteStudent(id:any){
    const login = fetch('http://localhost:8080/deleteStudent?id='+id, {
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
      if(data){
          this.getStudents();
          this.toastMessage = 'Student Deleted ';
          this.showToast();
      }
      // Handle the data returned from the server
      console.log('Post request response:', data[0]);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }


  async createStudent(dob:any,email:any,rollNo:any,mobileNumber:any,alternateMobile:any,department:any,classes:any,mentorEmail:any,staffname:any,state:any,city:any,address:any,parentorguardian:any,roomNo:any,pincode:any,parentEmail:any,firstName:any,lastName:any){
    
    var staffId;
    console.log('staffname',staffname.value);
    this.listOfStaffs.forEach((element:any) => {
        if(element.name == staffname.value){
          staffId = element.id;
        }
    });
   if(staffname.value!=null || staffname.value!=''){
    const create = await fetch('http://localhost:8080/addStudent',{
      method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            // name:name.value,
            dateOfBirth:dob.value,
            studentEmail:email.value,
            rollNo:rollNo.value,
            roomNo:roomNo.value,
            department:department.value,
            classes:classes.value,
            address:address.value,
            pincode:pincode.value,
            mentorEmail:mentorEmail.value,
            parentEmail:parentEmail.value,
            staffId:staffId,
            mobileNumber:mobileNumber.value,
            username:rollNo.value+'@kct.com',
            firstname:firstName.value,
            lastname:lastName.value,
            password:firstName.value.slice(0,2)+pincode.value.slice(0,2)            
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(res=>{
          return res.json();
          // console.log('The response of the body',a);
        })
        .then(data => {
          if(data.name!=null || data.name!=""){
            dob.value = '';
            email.value = '';
            rollNo.value = '';
            roomNo.value = '';
            department.value = '';
            classes.value = '';
            address.value = '';
            pincode.value = '';
            mentorEmail.value = '';
            parentEmail.value = '';
            mobileNumber.value = '';
            rollNo.value = '';
            firstName.value = '';
            lastName.value = '';
            this.toastMessage = 'Student Created ';
            this.getStaffs();
            this.showToast();
            // alert('Stutent Created Successfully');
          }
          console.log('The return data',data);
        })
   }
   else{
    alert('Staff Not Selected for Student');
   }
  }
  listOfStudents:any = [];
  getStudents(){
    const login = fetch('http://localhost:8080/getStudents', {
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
      this.listOfStudents= data;
      console.log('listOfStudents',this.listOfStudents)
      if(data[0]){
        // data.forEach((element: any) => {
        //   console.log('element',element);
          this.listOfStudents= data;
          this.listOfRecentsStudent = [];
              for(let i=0;i<6;i++){
                this.listOfRecentsStudent.push(data[i]);
              }
          console.log('this.listOfRecentsStudent',this.listOfRecentsStudent);

          console.log('this.listOfStudents',this.listOfStudents);
        // });
        // this.router.navigate(['home']);
      }
      console.log('Post request response:', data[0]);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  }

}
