import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';

@Component({
	selector: 'app-product-landing',
	templateUrl: './product-landing.component.html',
	styleUrls: ['./product-landing.component.scss']
})
export class ProductLandingComponent implements OnInit {
	history: any = [
		{path: '/', friendly: 'Home'},
		{path: '/products/top', friendly: 'Products'}
	];
	//rivate _Activatedroute: ActivatedRoute;
	categoryId: any = '';

	activeId = '';

	categorySub: any;
	categories: any = [];
	constructor(
		private productService: ProductService,
		private router: Router,
		private _Activatedroute: ActivatedRoute
	) {}
	ngOnInit(): void {
		this._Activatedroute.paramMap.subscribe(params => {
			//console.log();
			this.categoryId = params.get('category');
			if (this.categoryId == 'top') {
				this.categoryId = '';
			}
			this.productService.getCategories(this.categoryId);
			this.categorySub = this.productService
				.getCategoriesUpdateListener()
				.subscribe(data => {
					console.log(data);
					this.categories = data.cats;
					console.log(this.categories);

					if (this.categories.length < 1) {
						this.loadProds(this.categoryId);
					}
				});
		});
	}
	getNewCats(id: any) {
		this.router.navigate(['/products/' + id]);
		//this.productService.getCategories(id);
		console.log(this.categories);
		//this.activeId = id;
	}
	loadProds(id: any) {
		this.categorySub.unsubscribe();
		this.router.navigate(['/search/' + id]);
	}
}
