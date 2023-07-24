import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
	searchForm: FormGroup;

	constructor(private databaseService: DatabaseService, public fb: FormBuilder) {
		this.searchForm = fb.group({
			search: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	globalData: any = {};

	onSearchChange(searchValue: any): void {
		console.log(searchValue.target.value);
		this.databaseService
			.searchAll(searchValue.target?.value)
			.subscribe((data: any) => {
				this.globalData = data;
				console.log(this.globalData);
			});
	}
}
