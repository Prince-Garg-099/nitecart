import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  Address:any
  pincode:any
  city:any
  state:any
  phoneno:any
  name:any
  readData:any
  Totalsprod:any=[]
  modalRef?: BsModalRef;
  config = {
  animated: false
  };
  Orders: any
  Totalorder: any;
  total: any;

  constructor(private service:AdminService,private modalService: BsModalService) { }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);  
  }

  ngOnInit(): void {
    this.getdelAdd();
  }

  getdelAdd(){
    this.service.getdelAdd().subscribe((res)=>{
    this.Orders = res.data; 
    this.Totalorder =this.Orders.length         
    });
  }

  setOrderStatus(order_id:string, statuskey: string, statusValue:string){
    this.service.setOrderStatus(order_id, statuskey, statusValue).subscribe();
  }

}
