import { Component, Input , EventEmitter, Output} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
	@Output() catRouting: EventEmitter<any> = new EventEmitter<any>();
	@Input() cards: any = [];

	loadCat(id: string){
		this.catRouting.emit(id)
	}
}
