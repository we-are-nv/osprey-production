import { Component } from '@angular/core';
import { ScrollService } from './services/scrollService/scroll.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private scrollService: ScrollService) {}
	title = 'ospreyProduction';
}
