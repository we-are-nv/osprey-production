import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { ProductLandingComponent } from './pages/products/product-landing/product-landing.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { MarketInfoComponent } from './pages/markets/market-info/market-info.component';

const routes: Routes = [
  // General Pages
  {path:'', component:HomeComponent},
  {path:'contact', component:QuoteFormComponent},

  // Service Pages
  {path:'services', component:ServicesComponent},
  {path:'services/', component:ServicesComponent},

  // Market Pages
  {path:'markets', component:MarketsComponent},
  {path:'markets/marine', component:MarketInfoComponent},


  // Product pages
  {path:'products/landing', component:ProductLandingComponent},
  {path:'products/:category', component:ProductsComponent},
  {path:'product/:category/:id', component:ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
