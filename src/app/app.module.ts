import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, SocialUser } from 'ng-social-login-module';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { ProductsComponent } from './Admin/products/products.component';
import { TotaluserComponent } from './Admin/totaluser/totaluser.component';
import { HomeComponent } from './User/home/home.component';
import { CartComponent } from './User/cart/cart.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { TrackingComponent } from './User/tracking/tracking.component';
import { MyordersComponent } from './User/myorders/myorders.component';
import { FooterComponent } from './User/footer/footer.component';
import { WishlistComponent } from './User/wishlist/wishlist.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Admin/navbar/navbar.component';
import { loginAuthService } from './User/services/auth.service';
import { UserService } from './User/services/user.service';
import { TokeninterceptorService, } from './User/services/tokeninterceptor.service';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxPrintModule } from 'ngx-print';
import { SettingsComponent } from './Admin/settings/settings.component';


const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('144591942243-ohhr6e9s8h1v05esg2go1kr7qecmucab.apps.googleusercontent.com')
  }
], true);

 
export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    TotaluserComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    TrackingComponent,
    MyordersComponent,
    FooterComponent,
    WishlistComponent,
    NavbarComponent,
    MyprofileComponent,
    SettingsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgxPrintModule
  ],
  
  providers: [loginAuthService,UserService,SocialUser,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi:true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
         
  bootstrap: [AppComponent]
})

export class AppModule { }
