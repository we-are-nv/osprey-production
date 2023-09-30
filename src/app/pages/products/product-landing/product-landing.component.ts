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
	categoryInfoSub: any;

	constructor(
		private productService: ProductService,
		private router: Router,
		private _Activatedroute: ActivatedRoute,
		private http: HttpClient,
	) {}
	ngOnInit(): void {
		this.customPageInfo = '';
		this.categoryInfoSub = this.productService
				.getSingleCategoryUpdateListener()
				.subscribe((data:any)=>{
					this.customPageInfo = data
				})
			
		this._Activatedroute.paramMap.subscribe(params => {
			this.categoryId = params.get('category');
			
			// if (this.categoryId == 'top') {
			// 	this.categoryId = '';
			// }
			
			
			this.http.get<any>(	this.API_URL + '/products/categories/convert-route?name=' +this.categoryId)
				.subscribe(response => {
					this.categoryId = response._id;
					if(this.categoryId !== ''){
						this.productService.getSingleCategory(this.categoryId);
					}
				});
			});
	}
	loadProds(id: any) {}
}
