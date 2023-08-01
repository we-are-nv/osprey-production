import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProductService} from 'src/app/services/product.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	constructor(
		private productService: ProductService,
		private router: Router,
		private _Activatedroute: ActivatedRoute
	) {}
	products: any;

	types: any[];
	categoryId = '';

	category: any;

	subCats: any = [];
	currentPage: number;
	totalPages: number;
	public productsSub: Subscription;

	history: any;

	ngOnInit() {
		this._Activatedroute.params.subscribe(params => {
			this.categoryId = params['category'];

			this.productService.getCategoriesUpdateListener().subscribe((data: any) => {
				this.subCats = data.cats;
			});

			this.productService.getCategories(this.categoryId);

			this.productService.getProducts({
				category: this.categoryId,
				page: 1,
				limit: 10
			});

			// Breadcrumb Setup
			this.history = [
				{path: '/', friendly: 'Home'},
				{path: '/products/top', friendly: 'Products'},
				{path: '/products/' + this.categoryId, friendly: this.categoryId}
			];

			this.productService.getSingleCategory(this.categoryId).subscribe(data => {
				this.category = data.data;
			});
		});
		this.productsSub = this.productService
			.getProductsUpdateListener()
			.subscribe(data => {
				console.log(data);
				this.products = data.products;
				this.currentPage = data.currentPage;
				this.totalPages = data.totalPages;
			});
	}

	currentCategory = null;

	changeType(value: any) {
		this.category = value;
		this.productService.getProducts({
			category: this.categoryId,
			page: 1,
			limit: 10
		});
	}
	loadProduct(id: any) {
		this.router.navigate([`${id}`]);
	}

	// On search
	onSearchChange(searchValue: any): void {
		// console.log(searchValue.target.value);
		this.productService.searchProducts({
			page: 1,
			searchQuery: searchValue.target.value,
			extra: true
		});
	}
	changePage(newPage: any) {
		this.productService.getProducts({category: this.categoryId, page: newPage});
		let top = document.getElementById('productList');
		top?.scrollIntoView();
	}
}

//
