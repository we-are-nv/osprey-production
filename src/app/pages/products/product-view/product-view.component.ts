import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{

  constructor(private _Activatedroute:ActivatedRoute){}
  sub:any;
  id:any;
  ngOnInit() {
    this.sub = this._Activatedroute.params.subscribe(params => {
     this.id = params['id'];
     });
     console.log(this.id);
   }
}
