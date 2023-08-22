import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements  OnInit{
  
  
  @Input() categoryId: any;
  similarProducts:any; 
  similarProductsSub: any;

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            this.similarProducts = data.products;
      });
  }


  
}
