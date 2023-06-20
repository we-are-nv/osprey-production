import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
	@Input() history: [{ path: string; friendly: string }] = [
		{ path: '', friendly: 'home' }
	];

	categorySub: any;
	categories: any = [];
	constructor(private productService: ProductService) {}
	ngOnInit(): void {
		this.productService.getCategories();
		this.categorySub = this.productService
			.getCategoriesUpdateListener()
			.subscribe(data => {
				this.categories = data.cats;
			});
	}
}
