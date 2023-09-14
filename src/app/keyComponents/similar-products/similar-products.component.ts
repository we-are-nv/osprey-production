import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements  OnInit, OnChanges{
  
  
  @Input() categoryArray: any;
  similarProducts:any; 
  similarProductsSub: any;

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            this.similarProducts = data.products;
            console.log(data)
      });
  }
  ngOnChanges(){
    let categoryIdArray: any[] = []
    this.categoryArray.forEach((category:any) =>{
      categoryIdArray.push(category._id)
    })
    this.productService.getProducts({
      category: categoryIdArray,
      page: 1,
      limit: 4,
      viewChildren: true,
    })
  }


  
}
