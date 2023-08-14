import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';

@Component({
	selector: 'app-sub-page',
	templateUrl: './sub-page.component.html',
	styleUrls: ['./sub-page.component.scss']
})
export class SubPageComponent implements OnInit {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService
	) {}


	@Input() subPage: string;

	pageId: string;
	pageData: any;
	elements: any;

	ngOnInit(): void {
		this.pageData = undefined;
		this._Activatedroute.params.subscribe(params => {
      let renderInfo: any = this._Activatedroute.snapshot.data;
      let renderType = renderInfo.type;
      if (renderType == "id") {
        this.pageId = params['childId'];
        console.log(this.pageId);
        this.infoService.getSubPage(this.pageId);
        this.infoService.getPageListener().subscribe(data => {
          this.pageData = data;
          this.elements = this.pageData.elements;
          console.log(this.elements);
        });
      } else {

      }

			if(this.subPage == undefined) this.pageId = params['childId'];
			else this.pageId = this.subPage;
			this.infoService.getSubPage(this.pageId);
			let pagelisten = this.infoService.getPageListener().subscribe(data => {
				this.pageData = data;
				this.elements = this.pageData.elements;
				pagelisten.unsubscribe();
			});
		});
	}
}
