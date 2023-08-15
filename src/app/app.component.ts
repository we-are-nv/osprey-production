import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from './services/scrollService/scroll.service';
import { ProductService } from './services/product.service';
import { InfoPageService } from './services/info-page.service';
import { DatabaseService } from './services/database.service';
import { NavloadService } from './services/navload.service';
import { IntialiseService } from './newServices/intialise.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	// Add new stored topLevelEntries
	topLevelEntries: any;


	title = 'ospreyProduction';

	isSearching = false;
	searchArray: any[] = [];
	searchData: any = {};
	searchInput: string = '';

	constructor(
		private databaseService: DatabaseService,
		private navbarService: NavloadService,
		private initialiseService: IntialiseService
	) {}
	categories: any = [];
	categorySub: any;

	productNav: any = [];
	finalNav: any = null;

	ngOnInit() {
		this.navbarService.generateNav();
		this.finalNav = this.navbarService.finalNav;

		// Initialise top level entries
		this.initialiseService.getAllTopLevel().subscribe(entries=> {
			this.topLevelEntries = entries
		})
	}

	onSearchChange(searchValue: any): void {
		this.databaseService.searchAll(searchValue).subscribe((data: any) => {
			this.searchData = data.results;
			this.searchArray = data.results.product;
			console.log(this.searchData.product);
			console.log(this.searchData);
		});
	}
}
