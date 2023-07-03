import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements OnChanges, OnInit{
  
  
  @Input() categoryId: any;
  similarProducts:any; 
  similarProductsSub: any;

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            // console.log(data)
            this.similarProducts = data.products;
            console.log(data)
      });
  }
  ngOnChanges(){
    console.log(this.categoryId)
    
      
        this.productService.getProducts({category:this.categoryId, page:1, limit:4});
  }

  onResize() {
    console.log("hello")
    
  }
  
}
