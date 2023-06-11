import { Location } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnChanges {

  @Input() history:[{path:string, friendly:string}];

  
  constructor(private location: Location){
    
  }

  ngOnChanges(){
    let friendlyUrl = '/'
    this.history.forEach(route => {
      friendlyUrl += (route.friendly +'/')
    });
    this.location.replaceState(friendlyUrl);

  }

  

  isLatest(i: number): boolean{
    if (i == this.history.length){
      return true;
    }else{
      return false;
    }
  }


}
