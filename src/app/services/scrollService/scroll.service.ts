import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {
	private routesToTop: string[] = ['info-page']; // Add the route names that should scroll to top

	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = this.router.url;
				console.log(url);
				const shouldScrollToTop = this.routesToTop.some(route =>
					url.includes(route)
				);

				if (!shouldScrollToTop) {
					let element = document.getElementById('hero');
					element?.scrollIntoView({ behavior: 'smooth' });
				} else {
					let element = document.getElementById('main-info');
					element?.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	}
}
