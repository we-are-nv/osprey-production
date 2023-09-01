import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pipe, tap } from 'rxjs';
import { InfoPageService } from 'src/app/services/info-page.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-general-info-page',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss']
})
export class GeneralInfoPageComponent implements OnInit, AfterViewInit {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private infoService: InfoPageService,
		private router: Router,
    private http: HttpClient,
    private meta: Meta
	) {}
  private API_URL = environment.API_URL;
	@Input() isHero: boolean = true;
	@Input() type: string;
	@Input() page: string;
	@Input() subPage: string
	pageType: string;
	pageId: string;
  pageName: string;

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
		this.siblingPages = [];

		this.subPages = [];


    let pageSub = this.infoService.getMainUpdateListener()
      .subscribe(data => {
      
      this.pageData = data;
      this.subPages = data.pages;
      this.bonusCards = data.bonus_cards;
      this.activeSubPageId = this.subPages[0].id;

      if (data.suggestProducts){
        this.suggestedProducts = `info-${data._id}`
      }
      if(this.pageType) {
        let siblingSub = this.infoService.getThumbnails(this.pageType, true).subscribe((data: any) => {
          this.siblingPages = data;
  
          siblingSub.unsubscribe();
        });
      }

      // let cont = document.querySelector(".container")


      // //console.log("Show Container", cont);
      // //document.querySelector(".container")?.scrollIntoView()
      // window.focus();
      // window.scrollTo({top: 0})
      // Get Main Page
    })

    // When Id's change

    this._Activatedroute.params.subscribe(params => {
      let renderInfo: any = this._Activatedroute.snapshot.data;
      let renderType = renderInfo.type;
      this.pageType = params['type'];
      this.pageName = params['name']
      this.pageId = params['id'];


      if (renderType == "id") {
        this.getPageDateBasedonID()  
      } else {
        this.getPageIDfromPageName()
      }
    });   
	}

  ngAfterViewInit(){
    window.scroll(0,0)
  }

  subscribetoPageData = () => {

  }

  getPageDateBasedonID = () => {
    //Any Validation 
    this.infoService.getMainPage(this.pageId);
  }

  getPageIDfromPageName = () => {
    this.http
    .get<any>(this.API_URL + `/info/convert-route?name=${this.pageName}&type=${this.pageType}`)
    //.subscribe(async (response) => {
      .pipe(
        tap((response) => {
          this.pageId = response._id;
          // Get Main Page
          //this.infoService.getMainPage(response._id);
          this.getPageDateBasedonID()
        }
        )
      );
  }

	selectPage(id: string) {
		this.activeSubPageId = id;
    console.log(this.activeSubPageId);
	}

	// breadCrumbUpdate(id: string){
	//   this.activeSubPageId = id;
	//   this.activeSubPageName = (this.subPages.find(i => i.id === this.activeSubPageId)).name

	// }
}
