import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { InfoPageService } from 'src/app/services/info-page.service';
@Component({
	selector: 'app-product-landing',
	templateUrl: './product-landing.component.html',
	styleUrls: ['./product-landing.component.scss']
})
export class ProductLandingComponent implements OnInit {
	private API_URL = environment.API_URL;
	history: any = [
		{ path: '/', friendly: 'Home' },
		{ path: '/products/top', friendly: 'Products' }
	];
	//rivate _Activatedroute: ActivatedRoute;
	categoryId: any = '';
	customPageInfo: any = '';
	default : string = `Many of our products have unique features that have been developed to meet specific client requirements not
	previously <br>
	available. The company provides unrivalled technical and commercial support for their products and services.
	Explore our <br>
	innovative product range below:`
	activeId = '';

	categorySub: any;
	categories: any = [];

	constructor(
		private productService: ProductService,
		private router: Router,
		private _Activatedroute: ActivatedRoute,
		private http: HttpClient,
	) {}
	ngOnInit(): void {
		this.customPageInfo = '';
		this._Activatedroute.paramMap.subscribe(params => {
			this.categoryId = params.get('category');
			console.log(this.categoryId)
			// if (this.categoryId == 'top') {
			// 	this.categoryId = '';
			// }
			this.http
				.get<any>(
					this.API_URL +
						'/products/categories/convert-route?name=' +
						this.categoryId
				)
				.subscribe(response => {
					this.productService.getCategories(response._id);
					
					// get single data for customPageInfo
					this.categorySub = this.productService
						.getCategoriesUpdateListener()
						.subscribe(data => {
							this.categories = data.cats;

						});
				});
		});
	}
	getNewCats(data: any) {
		if (data.hasChild) {
			this.router.navigate([data.cat_url]);
		} else if (!data.hasChild && !data.hasProducts) {
			this.router.navigate([data.redirectTo]);
		} else if (!data.hasChild) {
			this.categorySub.unsubscribe();
			this.router.navigate([data.cat_url]);
		}
	}
	loadProds(id: any) {}
}
