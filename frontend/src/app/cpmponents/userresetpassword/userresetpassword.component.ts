import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userresetpassword',
  templateUrl: './userresetpassword.component.html',
  styleUrls: ['./userresetpassword.component.css']
})
export class UserresetpasswordComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    Newpassword: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
  })
  constructor(private rs: UserService,private http:HttpClient ) { }

  ngOnInit(): void {
    
  }
  get username() { return this.loginForm.get('username'); }

  get Newpassword() { return this.loginForm.get('Newpassword'); }


  updatePassword() {
    let bodyData2 = {
      "username": this.loginForm.value.username,
     };

    this.http.put("http://localhost:3000/user/checkUserBy",bodyData2,{responseType:'text'}).subscribe(data => {
      
      Swal.fire('Update password', 'successfully','success')  
      console.log(data);

    })
  }



}