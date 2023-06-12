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
  subPageId: string;
  subPageData: any;


  pageData: any;
  subPages: {id: string, name: string}[];


  history: any;
  ngOnInit(){   
    this._Activatedroute.params.subscribe(params =>{
      this.pageType = params["type"];
      this.pageId = params["id"];

      this.pageData = this.infoService.getPage(this.pageType);

      
    console.log(this.pageData.banner_image); 

      this.subPages = this.pageData.pages;


      if(this._Activatedroute.children.length <= 0){
          this.router.navigate([`/info-page/${this.pageType}/${this.pageId}/${this.subPages[0].id}`]);
          this.subPageId = this.subPages[0].id;
          this.subPageData = this.subPages[0]
          this.breadCrumbUpdate()
          
        }else{
          this._Activatedroute.firstChild?.params.subscribe(params => {
            this.subPageId = params["childId"];
            this.subPageData = this.subPages.find(i => i.id === this.subPageId)
            this.breadCrumbUpdate()
        });
        }
      })
    
      
    
  }

  breadCrumbUpdate(){
    this.history = [
      {path:"/", friendly:"Home"},
      {path:`/info-page/${this.pageType}/${this.pageId}`, friendly:this.pageData.name},
      {path:`/info-page/${this.pageType}/${this.pageId}/${this.subPageId}`, friendly:this.subPageData.name}
    ]
  }

     
  
}
