import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home';
import { AboutUsComponent } from './Components/about-us/about-us';
import { ProductDetailsComponent } from './Components/product-details/product-details';
import { NotFoundComponent } from './Components/not-found/not-found';
import { ProductsComponent } from './Components/products/products';
import { Order } from './Components/order/order';
import { VisionComponent } from './Components/about-us/vision/vision';
import { ValuesComponent } from './Components/about-us/values/values';
import { authGuard } from './Guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'about',
    component: AboutUsComponent,
    children: [
      { path: '', redirectTo: 'vision', pathMatch: 'full' },
      { path: 'vision', component: VisionComponent },
      { path: 'values', component: ValuesComponent }
    ]
  },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'order', component: Order },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'login', loadComponent: () => import('./Components/login/login').then(m => m.LoginComponent) },
  { path: '**', component: NotFoundComponent }
];
