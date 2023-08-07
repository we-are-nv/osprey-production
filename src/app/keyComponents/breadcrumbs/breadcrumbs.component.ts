import { Location } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { UrlFormatterPipe } from 'src/app/pipes/url-formatter.pipe';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnChanges {

  @Input() history:[{path:string, friendly:string}] = [{path:'', friendly:"home"} ];

  
  constructor(private location: Location, private urlFormatter: UrlFormatterPipe){
    
  }

  ngOnChanges(){
    let friendlyUrl: string = '/'
    if(history !== undefined){
      this.history.forEach(route => {
        friendlyUrl += (route.friendly +'/')
      });
    }
  }



  isLatest(i: number): boolean{
    if (i == this.history.length){
      return true;
    }else{
      return false;
    }
  }


}
