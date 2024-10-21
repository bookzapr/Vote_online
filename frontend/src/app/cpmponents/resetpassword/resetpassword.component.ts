import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

 resetPwdForm = new FormGroup({
    password2: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),

  })

  constructor( private http:HttpClient , private router:ActivatedRoute) {}
  username: any;
  password:any ;

  get password2() { return this.resetPwdForm.get('password2'); }

  results: any=[];
  

  ngOnInit(): void {
    this.showPasswordBy()
  }
 

  editPassword() 
  {
    let bodyData = {
     "password" : this.password,
    };

    

    this.http.put("http://localhost:3000/user/editPassword/"+this.router.snapshot.params['id'],bodyData,{responseType:'text'}).subscribe(data => {
      Swal.fire('update', 'successfully','success')

      
    })
  }

  showPasswordBy() {
    this.http.get<any>('http://localhost:3000/user/getUserBy/'+this.router.snapshot.params['id']).subscribe(data => {
      this.results = data;
    })

    
  }

}
