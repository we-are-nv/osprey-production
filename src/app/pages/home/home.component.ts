import { Component, ViewChild, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoPageService } from 'src/app/services/info-page.service';
import { Carousel } from 'primeng/carousel';

declare var Calendly: any;

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
		private infoPageService: InfoPageService,
		private renderer: Renderer2
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
				this.productCategories = data.cats;
				this.categoryListPart = this.productCategories.slice(
					this.categoryListPosition.first,
					this.categoryListPosition.last
				);
			});

		this.infoPageService.getThumbnails('market').subscribe((data: any) => {
			this.marketsList = data;

		});
		this.infoPageService.getThumbnails('service').subscribe((data: any) => {
			this.serviceList = data;
			this.serviceList.forEach((item)=>[
				item["type"] = "service"
			])
		});
	}


	openCalendlyPopup() {
		Calendly.initPopupWidget({
			url: 'https://calendly.com/paragon-security/30min'
		});
		return false; // Prevent default anchor link behavior
	}
}
