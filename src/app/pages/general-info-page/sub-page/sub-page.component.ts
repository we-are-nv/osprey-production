import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';

@Component({
	selector: 'app-sub-page',
	templateUrl: './sub-page.component.html',
	styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent implements OnInit, OnChanges {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService
	) {}


	@Input() subPage: string;

	pageId: string;
	pageData: any;
	elements: any;

	ngOnInit(): void {
		console.log(this.subPage)
        this.infoService.getSubPage(this.subPage);
        this.infoService.getPageListener().subscribe(data => {
          this.pageData = data;
          this.elements = this.pageData.elements;
        });
	}
	ngOnChanges(): void {
		this.infoService.getSubPage(this.subPage)
	}
}
