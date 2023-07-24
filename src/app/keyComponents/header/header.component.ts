import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatMenuTrigger} from '@angular/material/menu';
import {Router} from '@angular/router';
import {InfoPageService} from 'src/app/services/info-page.service';
import {ProductService} from 'src/app/services/product.service';
import {DatabaseService} from 'src/app/services/database.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('inputWiden', [
			state('normal', style({width: '1vw', opacity: '0'})), // Initial state
			state('widen', style({width: '50vw', opacity: '1'})), // Widened state
			transition('normal => widen', animate('2000ms ease-in')), // Transition time and easing function
			transition('widen => normal', animate('2000ms ease-out')) // Transition time and easing function
		]),
		trigger('navShrink', [
			state('normal', style({width: 'auto', opacity: '1'})), // Initial state
			state('widen', style({width: '0%', opacity: '0'})), // Widened state
			transition('normal => widen', animate('0500ms ease-in')), // Transition time and easing function
			transition('widen => normal', animate('3500ms ease-out')) // Transition time and easing function
		])
	]
})
export class HeaderComponent {
	inputState = 'normal';
	constructor(
		private productService: ProductService,
		private infoPageService: InfoPageService,
		public router: Router,
		private databaseService: DatabaseService
	) {}
	// Category Stored Data

	scrolled = false;
	navStyle = 'standard';

	isSearching = false;
	searchArray: any[] = [];
	searchData: any;

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
		if (this.inputState == 'normal') this.inputState = 'widen';
		else this.inputState = 'normal';
	}

	onEnter(event: any) {
		console.log('ENTER');
		console.log(event);
	}

	onSearchChange(searchValue: any): void {
		console.log('SEARCHCAH');
		console.log(searchValue.target.value);
		this.databaseService
			.searchAll(searchValue.target.value)
			.subscribe((data: any) => {
				this.searchData = data.results;
				this.searchArray = data.results.product;
				console.log(this.searchData.product);
				console.log(this.searchData);
			});
	}
}
