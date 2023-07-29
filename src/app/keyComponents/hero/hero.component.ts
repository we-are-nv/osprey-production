import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScrollService } from 'src/app/services/scrollService/scroll.service';
import { ScrollComponent } from 'src/app/services/scrollService/scroll/scroll.component';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
	private sequence: any[] = [];
	constructor(private scrollService: ScrollService, private dialog: MatDialog) {}

	ngOnInit() {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('navStyle', 'standard');
		}
	}
	@Input() mainTitle: string;
	@Input() secondaryTitle: string;
	@Input() upperTitle: string;
	@Input() lowerTitle: string;
	@Input() background: string;

	// button data
	@Input() isButtons: boolean;
	@Input() isButton3: boolean;

	@Input() whatsApp: boolean;

	@Input() button1Data: { text: string; path: string; type: string };
	@Input() button2Data: { text: string; path: string; type: string };
	@Input() button3Data: { text: string; path: string; type: string };

	// Styling
	@Input() centred: boolean;

	@Input() extraStyle: string;

	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		let contra = [
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

		this.sequence.push(event.key.toLowerCase());
		if (this.sequence == contra) {
			const dialogRef = this.dialog.open(ScrollComponent, {
				data: {}
			});
		}
	}
}
