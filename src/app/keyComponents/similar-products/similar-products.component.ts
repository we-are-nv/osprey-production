import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements  OnInit, OnChanges{
  
  
  @Input() categoryArray: any;
  @Input() currentProd: any;
  similarProducts:any; 
  similarProductsSub: any;
  categoryIdArray: any;

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            this.similarProducts = data.products;
            this.similarProducts.forEach((product: any)=>{
              if(product._id == this.currentProd){
                this.productService.getProducts({
                  category: this.categoryIdArray,
                  page:  Math.floor(Math.random() * data.totalPages),
                  limit: 4,
                  viewChildren: true,
                })
              }
            })
      });
  }
  ngOnChanges(){
    this.categoryIdArray = []
    this.categoryArray.forEach((category:any) =>{
      this.categoryIdArray.push(category._id)
    })
    this.productService.getProducts({
      category: this.categoryIdArray,
      page: 1,
      limit: 4,
      viewChildren: true,
    })
  }


  
}
