import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPageService } from 'src/app/services/info-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-info-page',
  templateUrl: './general-info-page.component.html',
  styleUrls: ['./general-info-page.component.scss']
})
export class GeneralInfoPageComponent implements OnInit{
  constructor(private _Activatedroute: ActivatedRoute, private infoService: InfoPageService, private router: Router){}
  pageType: string;
  pageId: string;

  // SubPage Surface Info
  activeSubPageId: string;
  activeSubPageName: string;


  pageData: any;
  subPages: any[];
  bonusCards: any[];


  history: any;
  ngOnInit(){   
    this._Activatedroute.params.subscribe(params =>{
      this.pageType = params["type"];
      this.pageId = params["id"];

      // Get Main Page
      this.infoService.getMainPage(this.pageId)
      this.infoService.getMainUpdateListener().subscribe(data =>{
        this.pageData = data
        this.subPages = data.pages;
        this.bonusCards =  data.bonus_cards

        if(this._Activatedroute.children.length <= 0){
          this.router.navigate([`/info-page/${this.pageType}/${this.pageId}/${this.subPages[0].id}`]);
          this.breadCrumbUpdate(this.subPages[0].id)
        }else{
          let id = this._Activatedroute.snapshot.params['childId']
          this.breadCrumbUpdate(id)
        }
      })
      

      


      // this._Activatedroute.firstChild?.params.subscribe(params => {
      //   this.activeSubPageId = params["childId"];
      //   this.activeSubPageName = this.subPages.find(i => i.id === this.activeSubPageId)
      //   this.breadCrumbUpdate()
      // });
      })
    
      
    
  }

  selectPage(id : string){
    this.breadCrumbUpdate(id)
  }

  breadCrumbUpdate(id: string){
    this.activeSubPageId = id;
    this.activeSubPageName = (this.subPages.find(i => i.id === this.activeSubPageId)).name
    this.history = [
      {path:"/", friendly:"Home"},
      {path:`/info-page/${this.pageType}/${this.pageId}`, friendly:this.pageData.name},
      {path:`/info-page/${this.pageType}/${this.pageId}/${this.activeSubPageId}`, friendly:this.activeSubPageName}
    ]

  }
}
