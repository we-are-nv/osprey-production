import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { CategoriesComponent } from './pages/services/categories/categories.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'quote', component:QuoteFormComponent},

  {path:'services', component:ServicesComponent},
  {path:'services/categories', component:CategoriesComponent},

  {path:'products/:category', component:ProductsComponent},
  {path:'product/:type/:id', component:ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
