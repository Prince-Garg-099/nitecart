import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { FormControl,FormBuilder, Validators } from '@angular/forms';
import { loginAuthService } from '../services/auth.service';
import { Router } from '@angular/router'; 
import { 
  AuthService ,
  GoogleLoginProvider
  
} from 'ng-social-login-module';
import { SocialUser } from 'ng-social-login-module';
import { AdminService } from 'src/app/Admin/services/admin.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true }, },{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
  ]
})
export class HomeComponent implements OnInit {
  max = 10;
  rate = 7;
  isReadonly = true;
  modalRef?: BsModalRef;
  modalRefsingup?: BsModalRef;  
  UserName: any;
  details: any;
  gdetails: any;
  Products: any;

  constructor(private toastr: ToastrService, private modalService: BsModalService,public service: loginAuthService,private fb: FormBuilder, private router:Router,private authService: AuthService,  public user: SocialUser, public adminservice:AdminService) { }
  loggedIn:any

  openModal(templatelogin: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatelogin);
  }
  openModalsignup(templatesignup: TemplateRef<any>) {
    this.modalRefsingup = this.modalService.show(templatesignup);
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.gdetails=[]
      this.getproddata();

      this.gdetails =this.user.name.split(" ");
  
    });
    this.cartItemfunc();
    this.UserName = (localStorage.getItem('userName')||"")
  }


  getproddata(){
    this.adminservice.getprodData().subscribe((res)=>{
      console.log(res)
      this.Products = res.proddata; 
     console.log(this.Products)})}

  itemsCart:any =[]
  addCart(category:any){

    let cartDataNull = localStorage.getItem("localCart")
    if(cartDataNull==null){
      let storeDataget:any = [];
      storeDataget.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataget));
      this.toastr.success(' Successfully Added to your cart',);
      
    }else{
      var id =category._id;
      let index:number = -1;
      this.itemsCart =JSON.parse(localStorage.getItem('localCart')||"");    
      for (let i=0; i<this.itemsCart.length; i++){
        if(id === (this.itemsCart[i]._id)){
          this.itemsCart[i].qnt =category.qnt;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(category);
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart))
        this.toastr.success(' Successfully Added to your cart',);

      }
      else{
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart))
        this.toastr.warning('Already added to cart',);


          }
    }
  this.cartItemfunc();
  }


  cartItem:number=0;
  cartItemfunc(){
    this.UserName = (localStorage.getItem('userName')||"")
    this.details=[]

    this.details=this.UserName.split(' ');
    if (localStorage.getItem('localCart')!=null) {
         
      var cartCount =JSON.parse(localStorage.getItem('localCart')||"");
this.cartItem = cartCount.length   }
  }

  cartNumber:number = 0;



  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    localStorage.setItem('usergName',this.user.name)
    const  guserForm = this.fb.group({
      'name': this.user.name,
      'email': this.user.email,
    });
    console.log(guserForm.value)
    localStorage.setItem('usergemail',this.user.email)

    if(this.user){

      this.service.creategData(guserForm.value).subscribe(
        res => {
          console.log(res)
                localStorage.setItem('usergId',res)

          this.router.navigate(['/app-home']) 
},
        err => console.log(err)
  )}
    this.router.navigate(['/app-home'])
    this.modalRef?.hide()
    this.toastr.success(' Successfully login');

   
  }
  

  wishaddClick(wish:any){
    wish.style.color = "red"
  }
 

  userForm = this.fb.group({
    'email': new FormControl('', Validators.required,),
    'password': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
    'contactno': new FormControl('', Validators.required),

  });
  
  registerUser() {
    {
      if(!this.userForm.valid){
        alert("All fields are required")
      }
      if(this.userForm.valid){
        this.service.createData(this.userForm.value).subscribe(
          res => {
            this.router.navigate(['/app-home'])
            this.toastr.success(' Successfully Registered');
   
          },
          err => console.log(err)
        )
      }
   
     }
 }

 loginForm = this.fb.group({
  'email': new FormControl('', Validators.required,),
  'password': new FormControl('', Validators.required),

});

loginUser() {
  {
  if(!this.loginForm.valid){
    this.toastr.show('All fields are required');
  }
   this.service.findData(this.loginForm.value).subscribe(
     res => {
      localStorage.setItem('token',res.userinfo.token)
      localStorage.setItem('userId',res.userinfo.userId)
      localStorage.setItem('userName',res.userinfo.userName)      
      this.UserName = res.userinfo.userName
      this.router.navigate(['/app-home'])
      this.toastr.success(' Successfully login');
    },
     err => {console.log(err.error)
      
      this.toastr.error(err.error);
       
    }
   )
   }}}
