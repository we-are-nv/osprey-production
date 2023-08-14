import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';

@Component({
	selector: 'app-general-info-page',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss']
})
export class GeneralInfoPageComponent implements OnInit {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService,
		private router: Router
	) {}

	@Input() isHero: boolean = true;
	@Input() type: string;
	@Input() page: string;
	@Input() subPage: string
	pageType: string;
	pageId: string;

	// SubPage Surface Info
	activeSubPageId: string;
	activeSubPageName: string;
  suggestedProducts:any
	pageData: any;
	subPages: any[];
	bonusCards: any[];

	siblingPages: any[];

	history: any;
	ngOnInit() {
		this.pageData = undefined;
		this.pageId = '';
    this.suggestedProducts = ""
		this.siblingPages = [];

		this.subPages = [];



		this._Activatedroute.params.subscribe(params => {
			if ((this.type == undefined) || (this.pageId == undefined)){
				this.pageType = params['type'];
				this.pageId = params['id'];
			}else{
				this.pageType = this.type
				this.pageId = this.page;
			}
			

			let siblingSub = this.infoService.getThumbnails(this.pageType).subscribe((data: any) => {
				this.siblingPages = data;

				siblingSub.unsubscribe();
			});

			// Get Main Page
			let pageSub = this.infoService.getMainUpdateListener().subscribe(data => {
				this.pageData = data;
				this.subPages = data.pages;
				this.bonusCards = data.bonus_cards;
				if (this.subPage !== undefined) this.activeSubPageId = this.subPages[0].id;
				else this.activeSubPageId = this.subPage
				
        console.log(data)
        if (data.suggestProducts){
          this.suggestedProducts = `info-${data._id}`
        }
				this.router.navigate([
					`${this.activeSubPageId}`
				]);

				pageSub.unsubscribe();
			});

			this.infoService.getMainPage(this.pageId);
		});
	}

	selectPage(id: string) {
		this.activeSubPageId = id;
	}

	// breadCrumbUpdate(id: string){
	//   this.activeSubPageId = id;
	//   this.activeSubPageName = (this.subPages.find(i => i.id === this.activeSubPageId)).name

	// }
}
