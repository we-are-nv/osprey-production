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
	infoPage: any;

	constructor(
		private productService: ProductService,
		private router: Router,
		private _Activatedroute: ActivatedRoute,
		private http: HttpClient,
		private infoService: InfoPageService
	) {}
	ngOnInit(): void {
		this.customPageInfo = ''
		this._Activatedroute.paramMap.subscribe(params => {
			//console.log();
			this.categoryId = params.get('category');
			// if (this.categoryId == 'top') {
			// 	this.categoryId = '';
			// }
			console.log('categoryId before convert-route: ', this.categoryId);
			this.http
				.get<any>(
					this.API_URL +
						'/products/categories/convert-route?name=' +
						this.categoryId
				)
				.subscribe(response => {
					console.log('product landing response data: ', response);
					this.productService.getCategories(response._id);
					// get single data for customPageInfo
					this.productService
						.getSingleCategory(response._id)
						.subscribe(singleData => {
							if (singleData){
								this.customPageInfo = singleData
								console.log(this.customPageInfo)
							}
							this.customPageInfo = singleData;
							console.log('singleData: ', singleData);
						});
					this.categorySub = this.productService
						.getCategoriesUpdateListener()
						.subscribe(data => {
							console.log(data);
							this.categories = data.cats;
							console.log(this.categories);
							console.log('product Landing data: ', data);
							this.infoService.getThumbnails(response._id).subscribe((data:any)=>{
								this.infoPage = data[0];
								console.log(this.infoPage)
								// this.router.navigate(['/info-page/' + this.category._id + '/' + firstPage._id])
	
						})
						});
				});
		});
	}
	getNewCats(data: any) {
		if (data.hasChild) {
			console.log(data);
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
