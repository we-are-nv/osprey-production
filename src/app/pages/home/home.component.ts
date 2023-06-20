import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	// Example List of Services
	categorySub: any;
	productCategories: any = [];

	history: [{ path: string; friendly: string }] = [{ path: '/', friendly: 'Home' }];

	constructor(
		private productService: ProductService,
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {
		matIconRegistry.addSvgIconSet(
			this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/images/customIcons`)
		);
	}
	ngOnInit(): void {
		// this.location.replaceState("/some/newstate/");

		this.productService.getCategories();
		this.categorySub = this.productService
			.getCategoriesUpdateListener()
			.subscribe(data => {
				this.productCategories = data.cats;
			});
	}
}
