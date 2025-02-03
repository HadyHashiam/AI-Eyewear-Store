import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; // استيراد CommonModule
import { NgSelectModule } from '@ng-select/ng-select';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeNavComponent } from './pages/home/home-nav/home-nav.component';
import { HomeFooterComponent } from './pages/home/home-footer/home-footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { ErrorComponent } from './pages/error/error.component';
import { BestStyleComponent } from './pages/best-style/best-style.component';
import { VirtualTryOnComponent } from './pages/virtual-try-on/virtual-try-on.component';
import { DeliveryDetailsComponent } from './pages/delivery-details/delivery-details.component';
import { ContactNavComponent } from './pages/contactus/contact-nav/contact-nav.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AddProductComponent } from './pages/dashboard/add-product/add-product.component';
import { ManageOrdersComponent } from './pages/dashboard/manage-orders/manage-orders.component';
import { ViewProductsComponent } from './pages/dashboard/view-products/view-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, data: { title: 'Welcome' } },
  { path: 'login', component: LoginComponent, data: { title: 'LogIn' } },
  { path: 'signup', component: SignupComponent, data: { title: 'SignUp' } },
  { path: 'logout', component: LogoutComponent, data: { title: 'logout' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'aboutUs', component: AboutusComponent, data: { title: 'Aboutus' } },
  { path: 'cart', component: CartComponent, data: { title: 'Cart' } },
  { path: 'orders', component: OrderComponent, data: { title: 'Order' } },
  {
    path: 'deliveryDetails',
    component: DeliveryDetailsComponent,
    data: { title: 'Deleviry Details' },
  },
  {
    path: 'bestStyle',
    component: BestStyleComponent,
    data: { title: 'Best Style' },
  },
  { path: 'error', component: ErrorComponent, data: { title: 'Error' } },
{
  path: 'dashboard',
  component: DashboardComponent,
  data: { title: 'Dashboard' },
  children: [
    {
      path: 'addproduct',
      component: AddProductComponent,
      data: { title: 'Add Product' },
    },
    {
      path: 'manageorder',
      component: ManageOrdersComponent,
      data: { title: 'Manage Order' },
    },
    {
      path: 'view',
      component: ViewProductsComponent,
      data: { title: 'View Product' },
    },
  ],
},
  {
    path: 'virtualTryOn',
    component: VirtualTryOnComponent,
    data: { title: 'Virtual Try On' },
  },
  {
    path: 'contactUs',
    component: ContactusComponent,
    data: { title: 'Contact Us' },
  },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeNavComponent,
    HomeFooterComponent,
    SignupComponent,
    CartComponent,
    OrderComponent,
    ErrorComponent,
    BestStyleComponent,
    VirtualTryOnComponent,
    DeliveryDetailsComponent,
    ContactNavComponent,
    LogoutComponent,
    AddProductComponent,
    ManageOrdersComponent,
    ViewProductsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
  ],
  exports: [RouterModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
