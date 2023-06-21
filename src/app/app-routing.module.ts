import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { ProductLandingComponent } from './pages/products/product-landing/product-landing.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GeneralInfoPageComponent } from './pages/general-info-page/general-info-page.component';
import { SubPageComponent } from './pages/general-info-page/sub-page/sub-page.component';

const routes: Routes = [
  // General Pages
  {path:'', component:HomeComponent},

  // Service Pages
  {path:'services', component:ServicesComponent},

  // Market Pages
  {path:'markets', component:MarketsComponent},

  // InfoPage
  {path:'info-page/:type/:id', 
  component: GeneralInfoPageComponent,
  children:[
    {path:':childId', component:SubPageComponent}
  ]
},


  // Product pages
  {path:'products/landing', component:ProductLandingComponent},
  {path:'products/:category', component:ProductsComponent},
  {path:'product/:category/:id', component:ProductViewComponent},



  // Contact Page
  {path:'contact', component:ContactComponent},
  {path:'contactFrom', component:QuoteFormComponent},

  // Error Page
  {path:'error', component:ErrorPageComponent},
  // {path:'**', redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
