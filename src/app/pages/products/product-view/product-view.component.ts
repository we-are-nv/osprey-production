import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{
  specs=["4x motorised zoom lens", "Day/Night switching for almost any lighting condition", "H264, MJPEG"];
  catagories=["hello", "second"];
  tags=["something cool", "cameras"]
  description="Example Description";

  constructor(private _Activatedroute:ActivatedRoute){}
  sub:any;
  id:any;
  ngOnInit() {
    sessionStorage.setItem("navStyle", "hello")
    this.sub = this._Activatedroute.params.subscribe(params => {
    this.id = params['id'];
    });
  }
  
}
