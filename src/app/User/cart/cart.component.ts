import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Admin/services/admin.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit {
  totalmrp: any;
  totalsave: any;

  constructor(private toastr: ToastrService,public adminservice:AdminService) { }

  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  
  }

  getCartDetails:any=[]; 
    CartDetails(){
    if(localStorage.getItem('localCart')){
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||"") 
    }
    }
    incQnt(proId:any, qnt:any){
      for (let i=0; i<this.getCartDetails.length; i++){
        if(this.getCartDetails[i]._id === proId){
          if (qnt!=5) {
            this.toastr.success("Quantity increase by one");

            this.getCartDetails[i].qnt = parseInt(qnt) + 1;
            console.log( this.getCartDetails[i].qnt)

          }
          if(qnt==5){
            this.toastr.info("We're Sorry ! Only 5 units allowed in each order");

          }
        }
      }
      localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
      this.loadCart();
    }
    decQnt(proId:any, qnt:any){
      for (let i=0; i<this.getCartDetails.length; i++){
        if(this.getCartDetails[i]._id === proId){
          if (qnt!=1) {
            this.getCartDetails[i].qnt =qnt - 1;
            this.toastr.success("Quantity decrease by one");

          }
        }
      }
      localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
      this.loadCart();

    }
    total:number=0;
    loadCart(){
      if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||"")
      this.total = this.getCartDetails.reduce(function(acc:any,val:any){
       return acc + (val.prodsellprice*val.qnt);
      },0)
      this.totalmrp = this.getCartDetails.reduce(function(acc:any,val:any){
        return acc + (val.prodmrp*val.qnt);
       },0)
       this.totalsave = this.totalmrp-this.total
      }
    }
    singleDelete(getCartDetail:any){
if(localStorage.getItem('localCart')){
  this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||"")
  for(let i=0; i<this.getCartDetails.length; i++){
    if(this.getCartDetails[i]._id === getCartDetail ){
      this.getCartDetails.splice(i,1);
      localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
      this.toastr.success('Successfully removed from cart',);
      this.CartDetails();
      this.loadCart();

    }
  }
}


    }

}
