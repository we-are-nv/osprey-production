import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-general-info-page',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss']
})
export class GeneralInfoPageComponent implements OnInit {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService,
		private router: Router,
    private http: HttpClient
	) {}
  private API_URL = environment.API_URL;
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

      // Get Main Page
        pageSub.unsubscribe();
    })

    // When Id's change

    this._Activatedroute.params.subscribe(params => {
      let renderInfo: any = this._Activatedroute.snapshot.data;
      let renderType = renderInfo.type;
      this.pageType = params['type'];
      this.pageId = params['id'];

      if(this.pageType) {
        let siblingSub = this.infoService.getThumbnails(this.pageType).subscribe((data: any) => {
          this.siblingPages = data;
          console.log(this.siblingPages)

          siblingSub.unsubscribe();
        });
      }

      if (renderType == "id") {

        this.infoService.getMainPage(this.pageId+ "hello");
      } else {
        this.http
        .get<any>(this.API_URL + '/info/convert-route?name=' + params['name'] + '&type='+ params['type'])
        .subscribe(response => {
        

          // Get Main Page

          this.infoService.getMainPage(response._id+"hello");
        })
      }



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
