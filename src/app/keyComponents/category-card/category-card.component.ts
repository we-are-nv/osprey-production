import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
	@Input() cards: any = [];


}
