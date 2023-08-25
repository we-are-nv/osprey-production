import { Injectable, Output, EventEmitter, HostListener, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ScrollComponent } from './scroll/scroll.component';
    
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	private routesToTop: string[] = ['info-page']; // Add the route names that should scroll to top

	@Output() private konami: EventEmitter<void>;

	constructor(
		private router: Router, public dialog: MatDialog,
		@Inject(DOCUMENT) private document: Document  
		) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = this.router.url;
				const shouldScrollToTop = this.routesToTop.some(route =>
					url.includes(route)
				);

					let hero = this.document.getElementById('hero');
					let main = this.document.getElementById('main-info');

					if (!shouldScrollToTop && hero) {
						hero?.scrollIntoView({ behavior: 'smooth' });
					} else if(main) {
						main?.scrollIntoView({ behavior: 'smooth' });
					}

			}
		});
	}
}
