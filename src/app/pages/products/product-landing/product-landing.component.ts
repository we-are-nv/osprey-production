import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ProductService} from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-product-landing',
	templateUrl: './product-landing.component.html',
	styleUrls: ['./product-landing.component.scss']
})
export class ProductLandingComponent implements OnInit {
  private API_URL = environment.API_URL;
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
		private _Activatedroute: ActivatedRoute,
    private http: HttpClient
	) {}
	ngOnInit(): void {
		this._Activatedroute.paramMap.subscribe(params => {
			//console.log();
			this.categoryId = params.get('category');
			// if (this.categoryId == 'top') {
			// 	this.categoryId = '';
			// }
      this.http
      .get<any>(
          this.API_URL + '/products/categories/convert-route?name=' + this.categoryId
      )
      .subscribe(response => {
          console.log(response);
          this.productService.getCategories(response._id);
          this.categorySub = this.productService
            .getCategoriesUpdateListener()
            .subscribe(data => {
              console.log(data);
              this.categories = data.cats;
              console.log(this.categories);

              if (this.categories.length < 1) {
                //this.loadProds(this.categoryId);
              }
            });

      });

		});
	}
	getNewCats(data: any) {
		if (data.hasChild) {
      console.log(data)
			this.router.navigate([data.cat_url]);
		} else {
			this.categorySub.unsubscribe();
			this.router.navigate([data.cat_url]);
		}
	}
	loadProds(id: any) {}
}
