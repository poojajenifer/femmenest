import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { triggerAsyncId } from 'node:async_hooks';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  showDialog = false;
  toastMessage = 'Complaint';
  textValue:any;
  showDialogOutpass = false;
  showDialogMaintain = false;
  showDialogueComplaint = false;
  studentName:any;
  staffEmail:any;
  dialogueTitle = 'Raise A Complaint';

  textFields = ['Name','Roll No','Room No','Nature of Complaint','Additional Comments'];
  // typeOfRequest:any;

  ngOnInit(): void {
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
          data.forEach((element:any) => {
            if(element.id == localStorage.getItem('staffId')){
                this.staffEmail = element.mailId; 
            }
          });
        })
    console.log('From Home page',localStorage.getItem('FirstName'));
    this.studentName = localStorage.getItem('FirstName');
  }


  async submitfeedback(message:any){
    this.toastMessage = 'Feedback';
    if(message.value!='' && message.value!=null && message.value!=undefined){
      const login = await fetch('http://localhost:8080/addFeedBack', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          message:message.value,
          userId:localStorage.getItem('userId'),
          createdDate: new Date()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      if (login.ok) {
        this.showToast();
        // alert('Complaint created Successfully');
        message.value = '';
        console.log('Login successful');
      } else {
        throw new Error('Login failed.');
      }
    }
    else{
      alert('Please Type the Message to Submit FeedBack');
    }
  }


  openDialog(event:any) {
    console.log(event.srcElement.innerText);
    console.log('event.srcElement.innerText',this.textValue);

    if(event.srcElement.innerText == 'Generate Outpass'){
       this.showDialogOutpass = true;
    }
    else if(event.srcElement.innerText == 'Request for Room Maintainance'){
      this.showDialogMaintain = true;
    }
    else if(event.srcElement.innerText == 'Raise Complaint'){
      this.showDialogueComplaint = true;
    }
    this.dialogueTitle = event.srcElement.innerText;
  }

  showToast(){
    var x = document.getElementById("snackbar")as HTMLElement;
    console.log('The X value is ',x);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  async submitOutpassReq(purpose:any,fromdate:any,todate:any,departuretime:any,arrivaltime:any){
    var isFieldsNotNull = true;
    // if(purpose.value==null || purpose.value==' ' || fromdate.value ==null || fromdate.value !=' ' || todate.value==null || todate.value!=' ' || departuretime.value ==null || departuretime.value ==' ' || arrivaltime.value==null || arrivaltime.value==' '){
    //   isFieldsNotNull = false;
    // }
    console.log('purpose.value',purpose.value);
    console.log('purpose.value',isFieldsNotNull);
    var leavep = '';
    var fromd = '';
    var tod = '';
    this.toastMessage = 'Outpass';
    if(this.dialogueTitle == 'Generate Outpass' && isFieldsNotNull ==true){
        // var a = name.value;?
        // console.log('The values in the fields',a);
        const login = await fetch('http://localhost:8080/addOutpass', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            purposeofleave: purpose.value,
            fromdate: fromdate.value,
            userId:localStorage.getItem('userId'),
            todate:todate.value,
            timeofdeparture:departuretime.value,
            timeofarrival:arrivaltime.value,
            status:"pending",
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (login.ok) {
          leavep = purpose.value;
          fromd = fromdate.value;
          tod = todate.value;  
          fromdate.value = '';
          purpose.value = '';
          todate.value = '';
          departuretime.value = '';
          arrivaltime.value ='';
          this.showToast();
          const email = localStorage.getItem('StudentEmail');
          const FirstName = localStorage.getItem('FirstName');
          const LastName = localStorage.getItem('LastName');
          const RollNo = localStorage.getItem('RollNo');
          const Class = localStorage.getItem('Class');
          const Department = localStorage.getItem('Department');
          const mentorEmail = localStorage.getItem('mentorEmail');
          const bearerToken = "00DdL000001dB55!AQEAQKrqDE.d86D2kGu2CqCXuYeANzZ.A17rmo5lEMKN20Stav16HkV60Rh0AlmMyrIcUKpXLmrZsmxrPIx3LN.MDk2u383X";
          const recordStore = await fetch('https://kct-3e-dev-ed.develop.my.salesforce.com/services/data/v60.0/sobjects/KCT_Email__c',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              Email_Body__c:`I'm ${FirstName}  ${LastName} (${RollNo}), from ${Class} ${Department} . I'm staying here at KCT hostel. Kindly grand me permission for the purpose of ${leavep} from ${fromd.split('T')[0]} to ${tod.split('T')[0]}.`,
              secondMailBody__c:`Dear parent, \nYour daughter ${this.studentName},${RollNo} from ${Class} ${Department}  is leaving the kct hostel for the purpose ${leavep} from ${fromd.split('T')[0]} to ${tod.split('T')[0]} . kindly approve the request`,
              To_Address__c:"femofficial57@gmail.com",//`${mentorEmail}`,
              Parent_Mail__c:localStorage.getItem('parentEmail'),
              Cc_Address__c:`${email},${this.staffEmail}`
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${bearerToken}`
            },
          })
          console.log(JSON.stringify(recordStore));
          if(recordStore.ok){{
            console.log('recordStore',recordStore);
          }}
          // alert('Complaint created Successfully');
          console.log('Login successful');
        } else {
          throw new Error('Login failed.');
        }
    }
    else{
      var x = document.getElementById("snackbar")as HTMLElement;
      console.log('The X value is ',x);
      x.className = "showerror";
      x.innerText = 'Please fill all the fields';

      setTimeout(function(){ 
        x.className = x.className.replace("showerror", ""); 
      }, 3000);
    }
    
  }

  async submitMaintainReq(issueTitle:any,issueType:any,issueDesc:any){
    var isFieldsNotNull = true;
    if(issueTitle.value == null || issueTitle.value == ' ' || issueType.value == ' ' || issueType.value == null  || issueDesc.value == ' ' || issueDesc.value == null){
      isFieldsNotNull = false;
    }
    this.toastMessage = 'Maintainence Request';
    if(this.dialogueTitle == 'Request for Room Maintainance' && isFieldsNotNull == true){
        // var a = name.value;
        // console.log('The values in the fields',a);
        const login = await fetch('http://localhost:8080/addMaintenance', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            issueType: issueType.value,
            userId:localStorage.getItem('userId'),
            title: issueTitle.value,
            issueDesc:issueDesc.value,
            status:'Pending',
            createdDate:new Date(),
            // natureOfComplaint:natureofcomplaint.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (login.ok) {
          issueType.value = '';
          issueTitle.value = '';
          issueDesc.value = '';
          this.showToast();
          // alert('Complaint created Successfully');
          console.log('Login successful');
        } else {
          throw new Error('Login failed.');
        }
    }
    else{
      var x = document.getElementById("snackbar")as HTMLElement;
      console.log('The X value is ',x);
      x.className = "showerror";
      x.innerText = 'Please fill all the fields';

      setTimeout(function(){ 
        x.className = x.className.replace("showerror", ""); 
      }, 3000);
    }
    
  }


  async submitComplaintReq(natureofcomplaint:any,additionalcomments:any,prioritylevel:any){
    var isFieldsNotNull = true;
    if(natureofcomplaint.value == '' || natureofcomplaint.value == null || additionalcomments.value==null || additionalcomments.value=='' || prioritylevel.value == null || prioritylevel.value == ''){
      isFieldsNotNull = false;
    }
    this.toastMessage = 'Complaint Request ';
    if(this.dialogueTitle == 'Raise Complaint' && isFieldsNotNull == true){
      var date = new Date();
        const login = await fetch('http://localhost:8080/addComplaint', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            date:date,
            userId:localStorage.getItem('userId'),
            natureOfComplaint:natureofcomplaint.value,
            additionalComment:additionalcomments.value,
            priorityLevel:prioritylevel.value,
            type:'Complaint',
            status:'Pending'
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (login.ok) {
          natureofcomplaint.value = '';
          additionalcomments.value = '';
          prioritylevel.value = '';
          this.showToast();
          // alert('Complaint created Successfully');
          console.log('Login successful');
        } else {
          throw new Error('Login failed.');
        }
    }
    else{
      var x = document.getElementById("snackbar")as HTMLElement;
      console.log('The X value is ',x);
      x.className = "showerror";
      x.innerText = 'Please fill all the fields';

      setTimeout(function(){ 
        x.className = x.className.replace("showerror", ""); 
      }, 3000);
    }
  }



  closeDialog() {
    this.showDialogOutpass = false;
    this.showDialogMaintain = false;
    this.showDialogueComplaint = false;
  }
}
