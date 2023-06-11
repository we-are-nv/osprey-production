import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() history:[{path:string, friendly:string}];

  
  constructor(private location: Location){
    
  }
  ngOnInit(){
    let friendlyUrl = '/'
    this.history.forEach(route => {
      friendlyUrl += (route.friendly +'/')
    });
    this.location.replaceState(friendlyUrl);

  }

  isLatest(i: number): boolean{
    console.log(i, this.history.length)
    if (i == this.history.length){
      return true;
    }else{
      return false;
    }
  }

}
