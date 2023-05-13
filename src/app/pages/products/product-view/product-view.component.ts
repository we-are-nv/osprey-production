import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

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



  constructor(private _Activatedroute:ActivatedRoute, private productService: ProductService){}
  id:any;
  productSub: Subscription;
  similarProductsSub: Subscription;

  similarProducts:any;

  product: any = null;

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => {
      this.id = params['id'];
      this.productService.getSingleProduct(this.id)
      this.productSub = this.productService.getSingleProductUpdateListener()
      .subscribe((data)=>{
        this.product = data;
        console.log(this.product)


        this.productService.getProducts({type:"camera", page:1, limit:4});  
        this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            console.log(data)
            this.similarProducts = data.products;


        });


    });
    });
  }
  
}
