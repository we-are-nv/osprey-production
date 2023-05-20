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


  constructor(private _Activatedroute:ActivatedRoute, private productService: ProductService){}
  id:any;
  productSub: Subscription;
  similarProductsSub: Subscription;

  category = ""

  similarProducts:any;

  product: any = null;
  additionalInfo: any = []

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => {
      this.id = params['id'];
      this.category = params['category'];
      this.productService.getSingleProduct(this.id, this.category)
      this.productSub = this.productService.getSingleProductUpdateListener()
      .subscribe((data)=>{
        this.product = data;
        this.additionalInfo = this.product.additional_information.info

        console.log(this.additionalInfo)
        

        this.productService.getProducts({category:this.category, page:1, limit:4});  
        this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            console.log(data)
            this.similarProducts = data.products;


        });


    });
    });
  }
  checking(data:any){
    console.log(data)
  }
  
}
