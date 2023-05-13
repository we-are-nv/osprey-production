import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './keyComponents/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FooterComponent } from './keyComponents/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';
import { ServicesComponent } from './pages/services/services.component';
import { HeroComponent } from './keyComponents/hero/hero.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './pages/products/products.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { CategoriesComponent } from './pages/services/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QuoteFormComponent,
    ServicesComponent,
    HeroComponent,
    ProductsComponent,
    ProductViewComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
