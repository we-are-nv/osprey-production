import {Component, Input, EventEmitter, Output, OnChanges, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from 'src/app/services/product.service';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnChanges, OnInit{
	@Output() catRouting: EventEmitter<any> = new EventEmitter<any>();
	categorySub:any;
	@Input() categoryId: string;
	cards: [any];

	constructor(private productService: ProductService, private router: Router){}
	ngOnInit(){
		this.categorySub = this.productService
					.getCategoriesUpdateListener()
					.subscribe((data:any) => {
						this.cards = data.cats;
					});
	}

	ngOnChanges(){
		console.log(this.categoryId)
		this.productService.getCategories(this.categoryId);
	}
	loadCat(id: string, hasChild: boolean, cat_url:any, hasProducts:boolean, redirectTo:String) {
		let obj = {
			id: id,
			hasChild: hasChild,
      hasProducts:hasProducts,
      redirectTo:redirectTo,
      cat_url:cat_url,
		};
		this.getNewCats(obj);
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
}
