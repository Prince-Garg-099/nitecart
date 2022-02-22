import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
  modalRef?: BsModalRef;
  Products: any;
  TotalProd: any;
  
  constructor(private modalService: BsModalService,private fb:FormBuilder , public service:AdminService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getprodData();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  productForm = this.fb.group({
    'prodname': new FormControl('', Validators.required),
    'prodmrp': new FormControl('', Validators.required),
    'prodsellprice': new FormControl('', Validators.required),
    'proddesc': new FormControl('', Validators.required),
    'prodseller': new FormControl('', Validators.required),
    'file': new FormControl('', Validators.required),
    'qnt': 1, 
  })

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
         this.productForm.patchValue({
        file: file
        });
    }
  }
  
  onProdAdd(){
    if(this.productForm.valid){
    this.service.postproData(this.productForm.value).subscribe((res) => {
    });}
    else{
      this.toastr.show('All fields are required');
    }
  }

  getprodData(){
  this.service.getprodData().subscribe((res)=>{
  this.Products = res.proddata; 
  this.TotalProd = this.Products.length
    });
  }

 deleteprodbyId(ProdId:any){
  this.service.deleteprodbyId(ProdId).subscribe((res)=>{
  this.toastr.success(' Successfully deleted');
  this.getprodData();
    });
  }

}
