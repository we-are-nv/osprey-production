import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';
import { ProductService } from 'src/app/services/product.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IconRegisterService } from 'src/app/services/icon-register.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('inputWiden', [
			state('normal', style({ opacity: '0', height: '80%', marginTop: '5%' })), // Initial state
			state(
				'widen',
				style({ opacity: '1', height: '80%', marginTop: '5%', delay: '3s' })
			), // Widened state
			transition('normal => widen', animate('2000ms ease-in')), // Transition time and easing function
			transition('widen => normal', animate('2000ms ease-out')) // Transition time and easing function
		]),
		trigger('navShrink', [
			state('normal', style({ opacity: '1' })), // Initial state
			state('widen', style({ opacity: '0' })), // Widened state
			transition('normal => widen', animate('0500ms ease-in')), // Transition time and easing function
			transition('widen => normal', animate('3500ms ease-out')) // Transition time and easing function
		])
	]
})
export class HeaderComponent implements OnInit {
	// New input for the top level entries retrieved in the app.component.ts file
	@Input() topLevelEntries: any;

	inputState = 'normal';
	constructor(
		private productService: ProductService,
		private infoPageService: InfoPageService,
		public router: Router,
		private databaseService: DatabaseService,
		private iconRegistry: IconRegisterService
	) {}

	ngOnInit(): void {
		this.searchData = {};
	}

	// Category Stored Data

	scrolled = false;
	navStyle = 'standard';

	isSearching = false;
	searchArray: any[] = [];
	filteredOptions: Observable<string[]>;
	searchData: any = {};
	searchInput: string = '';

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
	testFunction() {
		alert('FUCKs');
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
		console.log(searchValue);

		this.databaseService.searchAll(searchValue).subscribe((data: any) => {
			this.searchData = data.results;
			this.searchArray = data.results.product;
			console.log(this.searchData.product);
			console.log(this.searchData);
		});
	}
}
