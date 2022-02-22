import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './Admin/orders/orders.component';
import { ProductsComponent } from './Admin/products/products.component';
import { SettingsComponent } from './Admin/settings/settings.component';
import { TotaluserComponent } from './Admin/totaluser/totaluser.component';
import { CartComponent } from './User/cart/cart.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { FooterComponent } from './User/footer/footer.component';
import { HomeComponent } from './User/home/home.component';
import { MyordersComponent } from './User/myorders/myorders.component';
import { MyprofileComponent } from './User/myprofile/myprofile.component';
import { AuthGuard } from './User/services/auth.guard';
import { TrackingComponent } from './User/tracking/tracking.component';
import { WishlistComponent } from './User/wishlist/wishlist.component';


const routes: Routes = [
  { path: 'app-home', component:HomeComponent },
  { path: 'app-cart', component:CartComponent, canActivate:[AuthGuard] },
  { path: 'app-checkout', component:CheckoutComponent, canActivate:[AuthGuard] },
  { path: 'app-tracking', component:TrackingComponent, canActivate:[AuthGuard] },
  { path: 'app-tracking/:order_id', component:TrackingComponent, canActivate:[AuthGuard] },
  { path: 'app-myprofile', component:MyprofileComponent, canActivate:[AuthGuard] },
  { path: 'app-myorders', component:MyordersComponent, canActivate:[AuthGuard] },
  { path: 'app-footer', component:FooterComponent },
  { path: 'app-wishlist', component:WishlistComponent, canActivate:[AuthGuard] },
  { path: 'app-orders', component:OrdersComponent, canActivate:[AuthGuard] },
  { path: 'app-products', component:ProductsComponent, canActivate:[AuthGuard] },
  { path: 'app-products/:prodId', component:ProductsComponent },
  { path: 'app-totaluser', component:TotaluserComponent, canActivate:[AuthGuard] },
  { path: 'app-settings', component:SettingsComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
