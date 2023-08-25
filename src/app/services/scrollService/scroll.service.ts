import { Injectable, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
    
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	private routesToTop: string[] = ['info-page']; // Add the route names that should scroll to top

	@Output() private konami: EventEmitter<void>;

	constructor(
		private scroller: ViewportScroller,
		private router: Router, public dialog: MatDialog,
		@Inject(DOCUMENT) private document: Document  
		) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = this.router.url;
				const shouldScrollToTop = this.routesToTop.some(route =>
					url.includes(route)
				);
					const hero = this.document.getElementById('hero')
					const main = this.document.getElementById('main-info')

					if (!shouldScrollToTop && hero !== null) {
						scroller.scrollToAnchor("hero")
					} else if(main !== null) {
						scroller.scrollToAnchor("main-info")
					}

			}
		});
	}
}
