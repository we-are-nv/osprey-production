import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';

@Component({
	selector: 'app-category-card',
	templateUrl: './category-card.component.html',
	styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
	@Output() catRouting: EventEmitter<any> = new EventEmitter<any>();
	@Input() cards: any = [];
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		console.log(this.cards);
	}
	loadCat(id: string, hasChild: boolean, cat_url:any) {
		let obj = {
			id: id,
			hasChild: hasChild,
      cat_url:cat_url
		};
		this.catRouting.emit(obj);
	}
}
