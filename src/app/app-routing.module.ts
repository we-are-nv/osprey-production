import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { ProductLandingComponent } from './pages/products/product-landing/product-landing.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'quote', component:QuoteFormComponent},

  {path:'services', component:ServicesComponent},


  {path:'products/landing', component:ProductLandingComponent},
  {path:'products/:category', component:ProductsComponent},
  {path:'product/:category/:id', component:ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
