import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goodpassword',
  templateUrl: './goodpassword.component.html',
  styleUrls: ['./goodpassword.component.css']
})
export class GoodpasswordComponent implements OnInit {

  @Input() CommuData: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

}
