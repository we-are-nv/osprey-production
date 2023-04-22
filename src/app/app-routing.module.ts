import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'quote', component:QuoteFormComponent},
  {path:'services', component:ServicesComponent},
  {path:'products', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
