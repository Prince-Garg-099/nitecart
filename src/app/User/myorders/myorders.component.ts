import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Admin/services/admin.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  oneAtATime = true;
  isCollapsed = true;
  Orders: any;
  Totalorder: any;
  today: any;
  dd: any;


  constructor(public service: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getdelAdd();
  }
  delForm = this.fb.group({
    userId: localStorage.getItem('usergId') || ""
  });

  getdelAdd() {
    this.service.getdelAddbyId(this.delForm.value).subscribe((res) => {
      this.Orders = res.data;
      this.Totalorder = this.Orders.length
    });
  }

  cancelOrder(orderId:any){
    this.service.cancelOrder(orderId).subscribe((res) => {
    console.log(res)
    })
  }
}
