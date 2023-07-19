import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
	constructor(private databaseService: DatabaseService) {}

	onSearchChange(searchValue: any): void {
		console.log(searchValue.target.value);
		this.databaseService
			.searchAll({
				page: 1,
				limit: 10,
				searchFor: searchValue.target.value.toString()
			})
			.subscribe((data: any) => {
				console.log(data);
			});
	}
}
