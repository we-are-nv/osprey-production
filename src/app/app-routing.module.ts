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
import { GeneralInfoPageComponent } from './pages/general-info-page/general-info-page.component';
import { SubPageComponent } from './pages/general-info-page/sub-page/sub-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewsComponent } from './pages/news/news.component';
import { AccreditationsComponent } from './pages/accreditations/accreditations.component';

const routes: Routes = [
	// General Pages
	{ path: '', component: HomeComponent },

	// Service Pages
	{ path: 'services', component: ServicesComponent },

	// Market Pages
	{ path: 'markets', component: MarketsComponent },

	// InfoPage
	{
		path: 'info-page/:type/:id',
    data:{type:'id'},
		component: GeneralInfoPageComponent,
		children: [{ path: ':childId', component: SubPageComponent,data:{type:'id'}, }]
	},

  {
		path: 'info/:type/:name',
    data:{type:'friendly'},
		component: GeneralInfoPageComponent,
		children: [{ path: ':childId', component: SubPageComponent, data:{type:'friendly'} }]
	},

	// Product pages
	{ path: 'products/:category', component: ProductLandingComponent },
	{ path: 'search/:category', component: ProductsComponent },

	{ path: 'product/:id', component: ProductViewComponent, data: { type: 'id' } },
	{
		path: 'product/:code/:name',
		component: ProductViewComponent,
		data: { type: 'friendly' }
	},

	// Product pages (Friendly)
	{ path: 'home/products/:category', component: ProductLandingComponent },
	{ path: 'home/search/:category', component: ProductsComponent },
	{ path: 'home/product/:id', component: ProductViewComponent },

	// Contact Page
	{ path: 'contactFrom', component: QuoteFormComponent },
	{ path: 'searchAll/:p1', component: SearchPageComponent },

	// News Page
	{ path: 'news', component: NewsComponent },

	// Accreditations
	{ path: 'certifications', component: AccreditationsComponent },

	// Demo Carousel

	// Error Page
	{ path: 'error', component: ErrorPageComponent }
	// {path:'**', redirectTo:""}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
