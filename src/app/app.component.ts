import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { InfoPageService } from './services/info-page.service';
import { DatabaseService } from './services/database.service';
import { NavloadService } from './services/navload.service';

import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
    animations: [
        trigger('routeAnimations', [
            transition('* => *', [
                style({ position: 'relative' }),
                group([
                    query(':enter', [
                        style({ opacity: 0 }),
                    ], { optional: true }),
                    query(':leave', [
                        style({ opacity: 1 }),
                    ], { optional: true }),
                ]),
                group([
                    query(':enter', [
                        animate('0.3s', style({ opacity: 1 }))
                    ], { optional: true }),
                    query(':leave', [
                        animate('0.3s', style({ opacity: 0 }))
                    ], { optional: true }),
                ]),
            ]),
        ])
    ]
})
export class AppComponent implements OnInit {
	title = 'ospreyProduction';

	isSearching = false;
	searchArray: any[] = [];
	searchData: any = {};
	searchInput: string = '';

	constructor(
		private databaseService: DatabaseService,
		private navbarService: NavloadService,
		private router: Router,
		private _elementRef: ElementRef
	) {}
	categories: any = [];
	categorySub: any;

	productNav: any = [];
	finalNav: any = null;
      
    ngOnInit() {

		this._elementRef.nativeElement.removeAttribute("ng-version")

		this.navbarService.generateNav();
		this.finalNav = this.navbarService.finalNav;

		// this.router.events.subscribe((event) => {
		// 	console.log("Router Event")
		// 	if(!(event instanceof NavigationEnd)) {
		// 		return;
		// 	}
		// 	window.focus();
		// 	window.scrollTo(0, 0);
		// })
	}

	onSearchChange(searchValue: any): void {
		this.databaseService.searchAll(searchValue).subscribe((data: any) => {
			this.searchData = data.results;
			this.searchArray = data.results.product;
		});
	}

	onActivate(){
		// console.log("hello")
		// window.scrollTo(0,0)
		//document.querySelector(".container")?.scrollIntoView()
	}

	onDeactivate() {
		//document.body.scrollTop = 0
	}

	getRouteAnimationData(routeOutlet: RouterOutlet) {
let output =  routeOutlet.activatedRouteData['animation'] ?? "HomeModule"
        return output
    }
}
