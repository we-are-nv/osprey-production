import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';

declare var Calendly: any;
@Component({
	selector: 'app-sub-page',
	templateUrl: './sub-page.component.html',
	styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent implements OnInit, OnChanges {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService,
		private meta: Meta
	) {}


	@Input() subPage: string;

	pageId: string;
	pageData: any;
	elements: any;

	ngOnInit(): void {
        this.infoService.getSubPage(this.subPage);
        this.infoService.getPageListener().subscribe(data => {
          this.pageData = data;
          this.elements = this.pageData.elements;
		  console.log(this.elements)
        });
	}
	ngOnChanges(): void {
		this.infoService.getSubPage(this.subPage)
	}
	openCalendlyPopup() {
		Calendly.initPopupWidget({
			url: 'https://calendly.com/paragon-security/30min'
		});
		return false; // Prevent default anchor link behavior
	}
}
