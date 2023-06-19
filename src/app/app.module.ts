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
import { HttpClientModule } from '@angular/common/http';
import { ProductLandingComponent } from './pages/products/product-landing/product-landing.component';
import { MarketsComponent } from './pages/markets/markets.component';
import { NameConverterPipe } from './pipes/name-converter.pipe';
import { CharacterValidationPipe } from './pipes/character-validation.pipe';
import { ServicesInfoComponent } from './pages/services/services-info/services-info.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BreadcrumbsComponent } from './keyComponents/breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UrlFormatterPipe } from './pipes/url-formatter.pipe';
import { GeneralInfoPageComponent } from './pages/general-info-page/general-info-page.component';
import { SubPageComponent } from './pages/general-info-page/sub-page/sub-page.component';
import { BonusCardComponent } from './pages/general-info-page/bonus-card/bonus-card.component';


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
    ProductLandingComponent,
    MarketsComponent,
    NameConverterPipe,
    CharacterValidationPipe,
    ServicesInfoComponent,
    ErrorPageComponent,
    BreadcrumbsComponent,
    ContactComponent,
    UrlFormatterPipe,
    GeneralInfoPageComponent,
    SubPageComponent,
    BonusCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    
  ],
  providers: [UrlFormatterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
