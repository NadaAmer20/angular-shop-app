import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth-guard';
import { HomeComponent } from './Components/home/home';
import { AboutUsComponent } from './Components/about-us/about-us';
import { ProductDetailsComponent } from './Components/product-details/product-details';
import { NotFoundComponent } from './Components/not-found/not-found';
import { Order } from './Components/order/order';
import { VisionComponent } from './Components/about-us/vision/vision';
import { ValuesComponent } from './Components/about-us/values/values';
import { AddProductComponent } from './Components/add-product/add-product';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'about',
    component: AboutUsComponent,
    children: [
      { path: '', redirectTo: 'vision', pathMatch: 'full' },
      { path: 'vision', component: VisionComponent },
      { path: 'values', component: ValuesComponent },
    ],
  },
  {
    path: 'products',
    loadComponent: () => import('./Components/products/products').then((m) => m.ProductsComponent),
    canActivate: [authGuard],
  },
  { path: 'add-product', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'edit-product/:id', component: AddProductComponent, canActivate: [authGuard] },
  { path: 'order', component: Order },
  { path: 'product/:id', component: ProductDetailsComponent },
  {
    path: 'login',
    loadComponent: () => import('./Components/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./Components/register/register').then((m) => m.RegisterComponent),
  },
  { path: '**', component: NotFoundComponent },
];
