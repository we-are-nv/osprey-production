import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoPageService } from 'src/app/services/info-page.service';
import { Carousel } from 'primeng/carousel';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	@ViewChild('carousel') carousel: Carousel;
	// Example List of Services
	categorySub: any;
	productCategories: any = [];
	responsiveOptions: any[];

	history: [{ path: string; friendly: string }] = [{ path: '/', friendly: 'Home' }];

	marketsList: any[] = [];
	serviceList: any[] = [];

	marketsListPart: any[] = [];
	serviceListPart: any[] = [];
	categoryListPart: any[] = [];

	listLength = 4;

	marketListPosition = { first: 0, last: 0 + this.listLength };
	serviceListPosition = { first: 0, last: 0 + this.listLength };
	categoryListPosition = { first: 0, last: 0 + this.listLength };

	constructor(
		private productService: ProductService,
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer,
		private infoPageService: InfoPageService
	) {
		matIconRegistry.addSvgIconSet(
			this.domSanitizer.bypassSecurityTrustResourceUrl(
				`./assets/images/customIcons`
			)
		);

		this.responsiveOptions = [
			{
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '768px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '560px',
				numVisible: 1,
				numScroll: 1
			}
		];
	}
	ngOnInit(): void {
		// this.location.replaceState("/some/newstate/");

		this.productService.getCategories('');
		this.categorySub = this.productService
			.getCategoriesUpdateListener()
			.subscribe(data => {
				console.log('getCategories() data is: ',data);
				this.productCategories = data.cats;
				this.categoryListPart = this.productCategories.slice(
					this.categoryListPosition.first,
					this.categoryListPosition.last
				);
			});

		this.infoPageService.getThumbnails('market').subscribe((data: any) => {
			this.marketsList = data;
			this.marketsListPart = this.marketsList.slice(
				this.marketListPosition.first,
				this.marketListPosition.last
			);
			console.log(this.marketsList);
		});
		this.infoPageService.getThumbnails('service').subscribe((data: any) => {
			this.serviceList = data;
			this.serviceListPart = this.serviceList.slice(
				this.marketListPosition.first,
				this.marketListPosition.last
			);
		});
	}

	rightMove(type: string) {
		if (
			type == 'category' &&
			this.categoryListPart[this.listLength - 1] !==
				this.productCategories[this.productCategories.length - 1]
		) {
			this.categoryListPosition.first += 1;
			this.categoryListPosition.last += 1;
			this.categoryListPart = this.productCategories.slice(
				this.categoryListPosition.first,
				this.categoryListPosition.last
			);
		}
		if (
			type == 'market' &&
			this.marketsListPart[this.listLength - 1] !==
				this.marketsList[this.marketsList.length - 1]
		) {
			this.marketListPosition.first += 1;
			this.marketListPosition.last += 1;
			this.marketsListPart = this.marketsList.slice(
				this.marketListPosition.first,
				this.marketListPosition.last
			);
		}
		if (
			type == 'service' &&
			this.serviceListPart[this.listLength - 1] !==
				this.serviceList[this.serviceList.length - 1]
		) {
			this.serviceListPosition.first += 1;
			this.serviceListPosition.last += 1;
			this.serviceListPart = this.serviceList.slice(
				this.serviceListPosition.first,
				this.serviceListPosition.last
			);
		}
	}
	leftMove(type: string) {
		if (
			type == 'category' &&
			this.categoryListPart[0] !== this.productCategories[0]
		) {
			this.categoryListPosition.first -= 1;
			this.categoryListPosition.last -= 1;
			this.categoryListPart = this.productCategories.slice(
				this.categoryListPosition.first,
				this.categoryListPosition.last
			);
		}
		if (type == 'market' && this.marketsListPart[0] !== this.marketsList[0]) {
			this.marketListPosition.first -= 1;
			this.marketListPosition.last -= 1;
			this.marketsListPart = this.marketsList.slice(
				this.marketListPosition.first,
				this.marketListPosition.last
			);
		}
		if (type == 'service' && this.serviceListPart[0] !== this.serviceList[0]) {
			this.serviceListPosition.first -= 1;
			this.serviceListPosition.last -= 1;
			this.serviceListPart = this.serviceList.slice(
				this.serviceListPosition.first,
				this.serviceListPosition.last
			);
		}
	}

	onCustomPrevClick() {
		// Call the PrimeNG carousel's prev() method to go to the previous item
		// this.carousel.prev();
	}
	checking(thing: any){
		console.log(thing)
	}
}
