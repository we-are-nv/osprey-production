import { Injectable, Output, EventEmitter, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ScrollComponent } from './scroll/scroll.component';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	private routesToTop: string[] = ['info-page']; // Add the route names that should scroll to top

	@Output() private konami: EventEmitter<void>;

	constructor(private router: Router, public dialog: MatDialog) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = this.router.url;
				const shouldScrollToTop = this.routesToTop.some(route =>
					url.includes(route)
				);
				
				let hero = document.getElementById('hero');
				let main = document.getElementById('main-info');

				if (!shouldScrollToTop && hero) {
					hero?.scrollIntoView({ behavior: 'smooth' });
				} else if(main) {
					main?.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	}
}
