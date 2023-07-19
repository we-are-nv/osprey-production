import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(
		private productService: ProductService,
		private infoPageService: InfoPageService,
		public router: Router
	) {}
	// Category Stored Data

	scrolled = false;
	navStyle = 'standard';

	isSearching = false;

	@Input() finalNav: any;
	@Output() toggleNav: EventEmitter<any> = new EventEmitter();
	// On scroll detected, Set the toolbar class
	onWindowScroll(event: any) {
		if (window.pageYOffset > 20) {
			this.scrolled = true;
		} else {
			this.scrolled = true;
		}
	}

	toggle() {
		this.toggleNav.emit();
	}

	openMyMenu(menuTrigger: MatMenuTrigger) {
		menuTrigger.openMenu();
	}
	closeMyMenu(menuTrigger: MatMenuTrigger) {
		menuTrigger.closeMenu();
	}

	activateSearch() {
		if (this.isSearching) this.isSearching = false;
		else this.isSearching = true;
	}

	onEnter(event: any) {
		console.log(event);
	}
}
