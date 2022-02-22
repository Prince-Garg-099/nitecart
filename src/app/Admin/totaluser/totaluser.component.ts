import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-totaluser',
  templateUrl: './totaluser.component.html',
  styleUrls: ['./totaluser.component.css']
})

export class TotaluserComponent implements OnInit {
  Users: any;
  Totaluser: any;
 
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.getuserData();
  }

  getuserData(){
    this.service.getuserData().subscribe((res)=>{
    this.Users = res.userdata; 
    this.Totaluser =  this.Users.length
    });
  }
    
    
}
