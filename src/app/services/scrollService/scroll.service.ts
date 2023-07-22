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
	private sequence: string[] = [];
	private konamiCode = [
		'arrowup',
		'arrowup',
		'arrowdown',
		'arrowdown',
		'arrowleft',
		'arrowright',
		'arrowleft',
		'arrowright',
		'b',
		'a'
	];

	constructor(private router: Router, public dialog: MatDialog) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				const url = this.router.url;
				const shouldScrollToTop = this.routesToTop.some(route =>
					url.includes(route)
				);

				if (!shouldScrollToTop) {
					let element = document.getElementById('hero');
					element?.scrollIntoView({ behavior: 'smooth' });
				} else {
					let element = document.getElementById('hero');
					element?.scrollIntoView({ behavior: 'smooth' });
				}
			}
		});
	}

	Handler(event: KeyboardEvent) {
		if (this.sequence == this.konamiCode) {
			console.log('working');
			const dialogRef = this.dialog.open(ScrollComponent, {
				data: {}
			});
		}
		this.sequence.push(event.key.toLowerCase());

		console.log(this.sequence, this.konamiCode);
	}

	isKonamiCode(): boolean {
		return this.konamiCode.every(
			(code: string, index: number) => code === this.sequence[index]
		);
	}
}
