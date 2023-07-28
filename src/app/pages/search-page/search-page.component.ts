import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
	searchForm: FormGroup;

	constructor(
		private databaseService: DatabaseService,
		public fb: FormBuilder,
		private _Activatedroute: ActivatedRoute
	) {
		this.searchForm = fb.group({
			search: ['', [Validators.required, Validators.minLength(3)]]
		});
	}
	ngOnInit(): void {
		this._Activatedroute.params.subscribe(params => {
			this.onSearchChange(params['p1']);
			console.log(params['p1']);
		});
	}

	searchData: any = {};

	onSearchChange(searchValue: any): void {
		console.log(searchValue.target.value);
		this.databaseService
			.searchAll(searchValue.target?.value)
			.subscribe((data: any) => {
				this.searchData = data.results;
				console.log(this.searchData);
			});
	}
}
