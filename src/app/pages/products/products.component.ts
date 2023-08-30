import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import { InfoPageService } from 'src/app/services/info-page.service';
import {ProductService} from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private API_URL = environment.API_URL;
	constructor(
		private productService: ProductService,
		private router: Router,
    private http: HttpClient,
		private _Activatedroute: ActivatedRoute,
		private infoPageService: InfoPageService
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
		this.productService
				.getSingleCategoryUpdateListener()
				.subscribe(data => {
            this.category = data.data;
          });

		this._Activatedroute.params.subscribe(params => {
			this.categoryId = params['category'];
      this.http
      .get<any>(
          this.API_URL + '/products/categories/convert-route?name=' + this.categoryId
      )
      .subscribe(response => {
          let res = response._id;
          this.categoryId = res;
		 
          this.productService.getCategoriesUpdateListener().subscribe((data: any) => {
            this.subCats = data.cats;
          });

          this.productService.getCategories(this.categoryId);

          

          this.productService.getSingleCategory(this.categoryId)
		  

		  this.productService.getProducts({
            category: [this.categoryId],
			viewChildren: true,
            page: 1,
            limit: 12
          });

      });

		});
		this.productsSub = this.productService
			.getProductsUpdateListener()
			.subscribe(data => {
				this.products = data.products;
				this.currentPage = data.currentPage;
				this.totalPages = data.totalPages;
				this.history= [
					{path: '/', friendly: 'Home'},
					{path: '/products/top', friendly: 'Products'},
					{path:'/search/'+this.category._id, friendly: this.category.name}
				];

				if(this.products.length <= 0){
					
   					this.infoPageService.getThumbnails(this.category._id, false).subscribe((data:any)=>{
							let firstPage = data[0];
							this.router.navigate(['/info-page/' + this.category._id + '/' + firstPage._id])

					})

				}
			});




	}

	currentCategory = null;

	changeType(value: any) {
		this.category = value;
		this.productService.getProducts({
			
			viewChildren: true,
			category: this.categoryId,
			page: 1,
			limit: 12
		});
	}
	loadProduct(id: any) {
		this.router.navigate([`${id}`]);
	}

	// On search
	onSearchChange(searchValue: any): void {

		if(searchValue.target.value.length > 0){
			this.productService.searchProducts({
				page: 1,
				searchQuery: searchValue.target.value,
				extra: true
			});
		}
		else{
			this.productService.getProducts({
				category: this.categoryId,
				page: 1,
				limit: 12,
				viewChildren: true,
			  });
		}
	}
	changePage(newPage: any) {
		this.productService.getProducts({category: this.categoryId, page: newPage, viewChildren:true});
		let top = document.getElementById('productList');
		top?.scrollIntoView();
	}
}

//
